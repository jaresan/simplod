import {compose, lensProp, curry, lens, mapObjIndexed} from 'ramda';
import {fromJS} from 'immutable';

export const initial = {
  session: {},
  files: {},
  avatar: ''
};

const solid = lensProp('solid');

// FIXME: Replace with normal lensprop once refactored
const lensForImmutable = k => lens(s => s.get(k), curry((v, s) => s.set(k, fromJS(v))));

const forKey = k => compose(solid, lensForImmutable(k));

export const avatar = forKey('avatar');
export const session = forKey('session');
export const webId = compose(session, lensForImmutable('webId'));
export const folderUriChanging = forKey('folderUriChanging');

