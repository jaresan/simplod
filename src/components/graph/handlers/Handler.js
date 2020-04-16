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

  static onStateChange() {}
  // static onHover = setState('hover', true);
  // static onBlur = setState('hover', false);
  // static onDeselect = setState('selected', false);
  // static onSelect = setState('selected', true);

  static subscribeToChanges = (id, recipient) => {
    this.recipients[id] = recipient;
    if (!this.subscribed) {
      store.subscribe(() => this.onChange(store.getState()));
      this.subscribed = true;
    }
  };

  static onSelect(ref) {
    this.Actions.Model.r_toggleSelect(ref.id);
  }

  /**
   * Subscription method to redux store responding to changes on the store;
   */
  static onChange = state => {
    // FIXME: Add substore to class wrapper mapping
    // FIXME: Get id and class

    // FIXME: Map newState to wrapper state directly so that the redux logic doesn't leak to wrappers
    Object.values(this.recipients)
      .forEach(recipient => {
        const subState = state.model.getIn(['entities', recipient.id]);
        if (subState) {
          recipient.onStateChanged(subState.toJS());
        }
      });
  };
}
