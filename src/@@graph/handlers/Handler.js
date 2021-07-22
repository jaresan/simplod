/**
 * @file Handler classes only know about Redux and represent logic around model handling.
 * No UI logic is directly handled here, everything is delegated to the UI layer which
 * handles the changes by itself.
 * @module @@graph/handlers/Handler
 */
import {store, dispatch} from '@@app-state';
import { fromPairs, path, omit } from 'ramda';
import * as ModelState from '@@app-state/model/state';

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

  static bindProperties() {
    dispatch(ModelState.bindProperties([]));
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

  static remove(id) {
    const toOmit = this.recipients[id].getGroupController().remove();
    this.recipients = omit([id, ...toOmit], this.recipients);
  }

  /**
   * Subscription method to redux store responding to changes on the store;
   * @function
   */
  static onStateChange(state) {
    if (state === this.lastState) return;

    Object.values(this.recipients)
      .forEach(recipient => {
        const subState = path(['entities', recipient.handler.entityType, recipient.id], state);
        recipient.onStateChanged(subState);
      });
    this.lastState = state;
  };
}

store.subscribe(() => Handler.onStateChange(store.getState().model));
