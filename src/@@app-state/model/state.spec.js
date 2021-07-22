import { curry, view, assocPath } from 'ramda';

import {
  togglePropertyAsVariable,
  unhighlightEdges,
  updateLanguageInfos,
  updateClassName,
  togglePropertySelected,
  toggleClassSelected,
  toggleSelected,
  deselectAll,
  toggleSelections,
  bindProperties,
  registerNewClass,
  registerNewClassWithCallback,
  deleteClass,
  createNewPropertyTarget,
  hideUnselected
} from './state';

import {should} from 'chai';

should();


describe('@@app-state/model/state', () => {
  describe('togglePropertyAsVariable()', () => {
    it('should change data property asVariable flag', () => {
      const s = {
        model: {
          entities: {
            property: {
              dataProp: {
                asVariable: true,
                dataProperty: true
              },
              objectProp: {
                asVariable: true,
                target: 'b'
              }
            },
            class: {
              b: {
                id: 'b',
                selected: false,
                asVariable: true
              }
            }
          }
        }
      };

      const changeFlag = assocPath(['model', 'entities', 'property', 'dataProp', 'asVariable']);
      togglePropertyAsVariable('dataProp', false, s).should.eql(
        changeFlag(false, s)
      );

      togglePropertyAsVariable('dataProp', true, s).should.eql(
        changeFlag(true, s)
      );
    })

    it('should change class selection for object property', () => {
      togglePropertyAsVariable
    })
  });


  describe('unhighlightEdges()', () => {

  });


  describe('updateLanguageInfos()', () => {

  });


  describe('updateClassName()', () => {

  });


  describe('togglePropertySelected()', () => {

  });


  describe('toggleClassSelected()', () => {

  });


  describe('toggleSelected()', () => {

  });


  describe('deselectAll()', () => {

  });


  describe('toggleSelections()', () => {

  });


  describe('bindProperties()', () => {

  });


  describe('registerNewClass()', () => {

  });


  describe('registerNewClassWithCallback()', () => {

  });


  describe('deleteClass()', () => {

  });


  describe('createNewPropertyTarget()', () => {

  });


  describe('hideUnselected()', () => {

  });


});
