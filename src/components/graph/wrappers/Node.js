import {Wrapper} from './Wrapper';

export class Node extends Wrapper {
  static nodeType = 'rect';

  onClick = () => {
    console.log('node clicked');
  }
}
