/**
 * Handler classes only know about Redux and represent logic around model handling.
 * No UI logic is directly handled here, everything is delegated to the UI layer which
 * handles the changes by itself.
 */
import {store, dispatch} from '@@app-state';
import {dataChanged as onDataChanged} from '@@actions/lifecycle';
import {debounce} from 'lodash';
import { fromPairs, path } from 'ramda';
import * as ModelState from '@@app-state/model/state';
import { entityTypes } from '@@model/entity-types';

export class Handler {
  static lastState = {};
  static recipients = {};
  static subscribed = false;
  static dispatch = action => store.dispatch(action);
  static entityType = 'unknown';
  static resources = {};

  static clear() {
    this.lastState = {};
    this.recipients = {};
    this.resources = {};
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
    dispatch(ModelState.toggleSelected(this.entityType, id, selected));
  }

  static batchSelect(type, ids) {
    dispatch(ModelState.toggleSelections(type, fromPairs(ids.map(id => [id, {selected: true}]))));
  }

  static toggleEntityHidden(id, hidden) {
    dispatch(ModelState.toggleClassHidden(id, hidden))
  }

  static toggleEntityExpanded(id, expanded) {
    dispatch(ModelState.toggleClassExpanded(id, expanded))
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
        // FIXME: @reference don't use 'entities'
        const subState = path(['entities', recipient.handler.entityType, recipient.id], state);
          // FIXME: Map to relevant properties for the wrapper instead of sending subState as a whole
          // define selectors and mapping between redux state -> UI state in Wrappers themselves,
          // e.g. stateToStyle = {selected: {selected: true}} and then react to the child keys
        dataChanged = dataChanged || recipient.onStateChanged(subState);
      });

    if (dataChanged) {
      onDataChanged();
    }
  };
}

store.subscribe(() => Handler.onStateChange(store.getState().model));
