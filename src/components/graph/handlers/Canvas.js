import {Handler} from './Handler';
import Actions from 'src/actions';

export class Canvas extends Handler {
  static deselectAll = () => {
    this.dispatch(Actions.Model.Creators.r_deselectAll());
  };
}
