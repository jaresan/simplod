import {Handler} from './Handler';
import {dispatch} from '@@app-state';
import {deselectAll} from '@@app-state/model/state';

export class Canvas extends Handler {
  static deselectAll = () => dispatch(deselectAll);
}
