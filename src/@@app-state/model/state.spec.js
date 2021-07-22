import { curry, view, assocPath, pipe, set, pick, mergeRight, dissocPath, clone } from 'ramda';

import {
  togglePropertyAsVariable,
  updateLanguageInfos,
  updateClassName,
  togglePropertySelected,
  deselectAll,
  toggleSelections,
  bindProperties,
  registerNewClass,
  deleteClass,
  createNewPropertyTarget,
  hideUnselected,
  initial,
  selectionOrder
} from './state';

import * as ModelState from './state';

import {should} from 'chai';

should();


describe('@@app-state/model/state', () => {
  const s = {
    model: {
      ...initial,
      entities: {
        property: {
          dataProp: {
            asVariable: true,
            dataProperty: true,
            selected: false
          },
          objectProp: {
            asVariable: true,
            target: 'target',
            source: 'source',
            selected: false,
            predicate: 'test:predicate',
            targetType: 'test:targetType'
          },
          objectProp2: {
            asVariable: true,
            target: 'target',
            source: 'source',
            selected: false,
            targetType: 'test:targetType',
            predicate: 'test:predicate2'
          }
        },
        class: {
          target: {
            id: 'target',
            selected: false,
            asVariable: true,
            varName: 'targetVarName',
            info: {
              label: '',
              description: '',
              byLanguage: {
                en: {
                  label: 'enLabel',
                  description: 'enDescription'
                },
                de: {
                  label: 'deLabel',
                  description: 'deDescription'
                },
              }
            },
            propertyIds: [],
            hidden: false,
            expanded: false,
            type: 'test:targetType'
          },
          source: {
            id: 'source',
            selected: false,
            asVariable: true,
            varName: '',
            info: {
              label: '',
              description: '',
              byLanguage: {
                en: {
                  label: 'enLabel',
                  description: 'enDescription'
                },
                de: {
                  label: 'deLabel',
                  description: 'deDescription'
                },
              }
            },
            propertyIds: ['objectProp'],
            hidden: false,
            expanded: false,
            type: 'test:type'
          }
        }
      }
    },
  };

  const changeProperty = curry((key, id, flag, state) => assocPath(['model', 'entities', 'property', id, key], flag, state));
  const changeClass = curry((key, id, flag, state) => assocPath(['model', 'entities', 'class', id, key], flag, state));
  const changePropertyAsVar = changeProperty('asVariable');
  const changeClassSelected = changeClass('selected');

  describe('togglePropertyAsVariable()', () => {
        it('should change data property asVariable flag', () => {
      const id = 'dataProp';
      togglePropertyAsVariable(id, false, s).should.eql(changePropertyAsVar(id, false, s));

      togglePropertyAsVariable(id, true, s).should.eql(changePropertyAsVar(id, true, s));
    })

    it('should change class selection for object property', () => {
      const propId = 'objectProp';
      const classId = 'target';

      const classSelected = changeClassSelected(classId, true, s);
      const classNotSelected = changeClassSelected(classId, false, s);

      togglePropertyAsVariable(propId, false, classSelected).should.eql(pipe(
        changePropertyAsVar(propId, false),
        changePropertyAsVar('objectProp2', false),
        changeClassSelected(classId, false),
        set(selectionOrder, [])
      )(s))

      togglePropertyAsVariable(propId, true, classNotSelected).should.eql(pipe(
        changePropertyAsVar(propId, true),
        changeClassSelected(classId, true),
        set(selectionOrder, [classId])
      )(s))
    })
  });

  describe('updateLanguageInfos()', () => {
    it('should update info for English', () => {
      const newState = updateLanguageInfos('en', {target: view(ModelState.classById('target'), s)})(s);
      const newElement = view(ModelState.classById('target'), newState);
      pick(['label', 'description'], newElement.info).should.eql(newElement.info.byLanguage.en);
    });

    it('should update info to English for a missing language', () => {
      const newState = updateLanguageInfos('fr', {target: view(ModelState.classById('target'), s)})(s);
      const newElement = view(ModelState.classById('target'), newState);
      pick(['label', 'description'], newElement.info).should.eql(newElement.info.byLanguage.en);
    });
  });

  describe('updateClassName()', () => {
    it('should update class name and properties targeting the class', () => {
      updateClassName('target', 'newName', s).should.eql(pipe(
        changeProperty('varName', 'objectProp', 'newName'),
        changeProperty('varName', 'objectProp2', 'newName'),
        changeClass('varName', 'target', 'newName'),
      )(s));
    })
  });


  describe('togglePropertySelected()', () => {
    const deselected = pipe(
      changeProperty('selected', 'objectProp', false),
      changeProperty('selected', 'objectProp2', false),
      changeClass('selected', 'source', false),
      changeClass('selected', 'target', false),
      set(ModelState.selectionOrder, [])
    )(s);

    const withSelectedProp = pipe(
      changeProperty('selected', 'objectProp', true),
      changeProperty('selected', 'objectProp2', false),
      changeClass('selected', 'source', true),
      changeClass('selected', 'target', true),
      set(ModelState.selectionOrder, ['source', 'target', 'objectProp'])
    )(s);

    it('should update source class selection when first prop is selected', () => {
      togglePropertySelected('objectProp', true, deselected).should.eql(pipe(
        changeProperty('selected', 'objectProp', true),
        changeClass('selected', 'source', true),
        changeClass('selected', 'target', true),
        set(ModelState.selectionOrder, ['source', 'target', 'objectProp'])
      )(s));
    });

    it('should update target class selection when last prop is deselected', () => {
      togglePropertySelected('objectProp', false, withSelectedProp).should.eql(pipe(
        changeProperty('asVariable', 'objectProp', false),
        changeProperty('asVariable', 'objectProp2', false),
        changeClass('selected', 'source', false),
        changeClass('selected', 'target', false),
        set(ModelState.selectionOrder, [])
      )(s));
    });
  });

  describe('deselectAll()', () => {
    it('should deselect all', () => {
      const selected = pipe(
        changeProperty('selected', 'objectProp', true),
        changeProperty('selected', 'objectProp2', true),
        changeClass('selected', 'source', true),
        changeClass('selected', 'target', true),
        set(ModelState.selectionOrder, ['objectProp', 'objectProp2', 'source', 'target'])
      )(s);

      deselectAll(selected).should.eql(pipe(
        changeProperty('selected', 'objectProp', false),
        changeProperty('selected', 'objectProp2', false),
        changeClass('selected', 'source', false),
        changeClass('selected', 'target', false),
        set(ModelState.selectionOrder, [])
      )(s));
    });
  });


  describe('toggleSelections()', () => {
    it('should select entities', () => {
      toggleSelections('class', {source: {selected: true}, target: {selected: false}} , s)
        .should.eql(pipe(
        changeClass('selected', 'source', true),
        changeClass('selected', 'target', false),
        set(ModelState.selectionOrder, ['source'])
      )(s));
    });
  });


  describe('bindProperties()', () => {
    it('should bind object property var names to their target', () => {
      bindProperties(['objectProp', 'objectProp2'], s).should.eql(pipe(
        changeProperty('varName', 'objectProp', 'targetVarName'),
        changeProperty('varName', 'objectProp2', 'targetVarName')
      )(s));
    })
  });


  describe('registerNewClass()', () => {
    it('should register a new class', () => {
      const oldS = clone(s);
      registerNewClass('target', s);
      oldS.should.eql(s);
    });
  });


  describe('deleteClass()', () => {
    it('should delete class', () => {
      deleteClass('target', s).should.eql(pipe(
        assocPath(['model', 'entities', 'class', 'source', 'propertyIds'], []),
        dissocPath(['model', 'entities', 'class', 'target']),
        dissocPath(['model', 'entities', 'property', 'objectProp']),
        dissocPath(['model', 'entities', 'property', 'objectProp2'])
      )(s));
    });
  });

  describe('createNewPropertyTarget()', () => {
    it('should create new property target', () => {
      createNewPropertyTarget('objectProp', s).should.eql(pipe(
        set(
          ModelState.classById('test:targetType_1'),
          mergeRight(view(ModelState.classById('source'), s), {id: 'test:targetType_1', propertyIds: [], type: 'test:targetType', varName: 'targetType_1'})),
        set(
          ModelState.propertyById('property_source-test:predicate-test:targetType_1'),
          mergeRight(view(ModelState.propertyById('objectProp'), s), {target: 'test:targetType_1', varName: 'targetType_1'})),
        set(
          ModelState.propertyById('property_source-test:predicate2-test:targetType_1'),
          mergeRight(view(ModelState.propertyById('objectProp'), s), {target: 'test:targetType_1', varName: 'targetType_1', predicate: 'test:predicate2'})),
        set(
          ModelState.propertyById('objectProp'),
          mergeRight(view(ModelState.propertyById('objectProp'), s), {target: 'test:targetType_1'})),
        assocPath(['model', 'entities', 'class', 'source', 'propertyIds'], ['objectProp', 'property_source-test:predicate-test:targetType_1', 'property_source-test:predicate2-test:targetType_1']),
      )(s));
    });
  });

  describe('hideUnselected()', () => {
    it('should hide entities when no properties are selected', () => {
      const deselected = pipe(
        changeProperty('selected', 'objectProp', false),
        changeProperty('selected', 'objectProp2', false),
        set(ModelState.selectionOrder, [])
      )(s);

      hideUnselected(deselected).should.eql(pipe(
        changeClass('hidden', 'source', true),
        changeClass('hidden', 'target', true)
      )(s));
    });
  });
});
