import {compose, lensProp, dissocPath, set} from 'ramda';

export const initial = {
  session: {},
  files: {},
  avatar: '',
  folderUriChanging: false,
  folderUri: ''
};

const root = 'solid';
const rootLens = lensProp(root);

const forKey = k => compose(rootLens, lensProp(k));

export const avatar = forKey('avatar');
export const session = forKey('session');
export const files = forKey('files');
export const folderUri = forKey('folderUri');
export const webId = compose(session, lensProp('webId'));
export const folderUriChanging = forKey('folderUriChanging');
export const logOut = set(rootLens, initial);

export const deleteFile = filePath => dissocPath([root, 'files', ...filePath]);

