import {compose, lensProp, dissocPath, set} from 'ramda';

export const initial = {
  session: {},
  files: {},
  avatar: '',
  modelFileLocation: ''
};

const root = 'solid';
export const rootLens = lensProp(root);

const forKey = k => compose(rootLens, lensProp(k));

export const avatar = forKey('avatar');
export const session = forKey('session');
export const files = forKey('files');
export const webId = compose(session, lensProp('webId'));
export const logOut = set(rootLens, initial);
export const modelFileLocation = forKey('modelFileLocation');

export const deleteFile = filePath => dissocPath([root, 'files', ...filePath]);

