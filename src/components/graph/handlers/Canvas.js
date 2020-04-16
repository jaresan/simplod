import {Handler} from './Handler';
import Actions from 'src/actions';

export class Canvas extends Handler {
  static deselectAll = () => {
    Actions.Model.r_deselectAll();
  };
}
