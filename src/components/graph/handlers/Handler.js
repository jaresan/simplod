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
  static dispatch = action => store.dispatch(action);

  static subscribeToChanges = (id, recipient) => {
    this.recipients[id] = recipient;
  };

  static onSelect(ref) {
    this.dispatch(Actions.Model.Creators.r_toggleSelect(ref.get('id')));
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
          // defined selectors and mapping between redux state -> UI state
          recipient.onStateChanged(subState.toJS());
          recipient.lastState = subState;
        }
      });
  };
}

store.subscribe(() => Handler.onStateChange(store.getState()));
