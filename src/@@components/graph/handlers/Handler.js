/**
 * Handler classes only know about Redux and represent logic around model handling.
 * No UI logic is directly handled here, everything is delegated to the UI layer which
 * handles the changes by itself.
 */
import {store, dispatch} from '@@app-state';
import {dataChanged as onDataChanged} from '@@sagas/interactions';
import {debounce} from 'lodash';
import * as ModelState from '@@app-state/model/state';
import { entityTypes } from '@@constants/entityTypes';

export class Handler {
  static lastState = {};
  static recipients = {};
  static subscribed = false;
  static dispatch = action => store.dispatch(action);
  static entityType = 'unknown';
  static resources = {};
  static toSelect = Object.keys(entityTypes).reduce((acc, type) => ({[type]: {}, ...acc}), {});

  static clear() {
    this.lastState = {};
    this.recipients = {};
    this.resources = {};
  }

  static clearSelection() {
    this.toSelect = Object.keys(entityTypes).reduce((acc, type) => ({[type]: {}, ...acc}), {});
  }

  static subscribeToChanges = (id, recipient) => {
    this.recipients[id] = recipient;
  };

  static preregisterResource(data, id) {
    this.resources[id] = data;
  }

  static commitResources() {
    dispatch(ModelState.registerResources(this.entityType, this.resources));
  }

  static onToggleSelect(id, selected) {
    this.toSelect[this.entityType][id] = {selected};

    if (this.batchingSelect) {
      this.commitSelectsDebounced();
    } else {
      this.commitSelects();
    }
  }

  static commitSelects = () => {
    Object.keys(this.toSelect).forEach(type => dispatch(ModelState.toggleSelections(type, this.toSelect[type])));
    this.clearSelection();
  };

  static commitSelectsDebounced = debounce(this.commitSelects, 250, {leading: true});

  static startSelectBatch() {
    this.batchingSelect = true;
  }

  static stopSelectBatch() {
    this.batchingSelect = false;
  }

  static toggleEntityHidden(id, hidden) {
    dispatch(ModelState.toggleClassHidden(id, hidden))
  }

  /**
   * Subscription method to redux store responding to changes on the store;
   */
  static onStateChange(state) {
    if (state === this.lastState) return;

    let dataChanged = false;
    this.lastState = state;
    Object.values(this.recipients)
      .forEach(recipient => {
        // FIXME: @immutable
        const subState = state.getIn(['entities', recipient.handler.entityType, recipient.id]);
        if (subState && subState !== recipient.__lastState) {
          // FIXME: Map to relevant properties for the wrapper instead of sending subState.toJS() as a whole
          // define selectors and mapping between redux state -> UI state in Wrappers themselves,
          // e.g. stateToStyle = {selected: {selected: true}} and then react to the child keys
          recipient.onStateChanged(subState.toJS());
          recipient.__lastState = subState;
          dataChanged = true;
        }
      });
    if (dataChanged) {
      onDataChanged();
    }
  };
}

store.subscribe(() => Handler.onStateChange(store.getState().model));
