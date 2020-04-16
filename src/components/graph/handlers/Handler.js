/**
 * Handler classes only know about Redux and represent logic around model handling.
 * No UI logic is directly handled here, everything is delegated to the UI layer which
 * handles the changes by itself.
 */
import store from 'src/store';
import Actions from 'src/actions';

export class Handler {
  static recipients = {};
  static subscribed = false;
  static Actions = Actions;

  static subscribeToChanges = (id, recipient) => {
    this.recipients[id] = recipient;
  };

  static onSelect(ref) {
    this.Actions.Model.r_toggleSelect(ref.id);
  }

  /**
   * Subscription method to redux store responding to changes on the store;
   */
  static onStateChange = state => {
    Object.values(this.recipients)
      .forEach(recipient => {
        const subState = state.model.getIn(['entities', recipient.id]);
        if (subState !== recipient.lastState) {

          // FIXME: Map to relevant properties for the wrapper instead of sending subState.toJS() as a whole
          recipient.onStateChanged(subState.toJS());
          recipient.lastState = subState;
        }
      });
  };
}

store.subscribe(() => Handler.onStateChange(store.getState()));
