import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { getViewSelection } from '../selectors';
import SolidActions from 'src/actions/solid';
import ModelActions from 'src/actions/model';
import nPath from 'path';
import {pipe, path, assocPath, identity, replace} from 'ramda';
import {message} from 'antd';
import auth from 'solid-auth-client';
import rdf from 'rdflib';

// FIXME: Move all predicate etc specifiers to constants
// TODO: Split to multiple different files in a 'solid' directory

function* login() {
  const popupUri = 'dist-popup/popup.html';
  const session = yield call(auth.popupLogin, { popupUri });
  yield put(SolidActions.Creators.r_setSolidSession(session));

  return session;
}

function* onLogin() {
  yield login();
  yield onLoggedIn();
}

function* getSession() {
  const session = yield auth.currentSession();
  const expiration = path(['idClaims', 'exp'], session) * 1000;
  return {
    session,
    valid: expiration > Date.now()
  };
}

function* getSessionOrLogin() {
  const {session, valid} = yield getSession();
  if (!valid) {
    return login();
  } else {
    return session;
  }
}

function* onViewSave({uri}) {
  const view = yield select(getViewSelection);

  // FIXME: Add entry to folderUri settings file && the file itself
  try {
    const res = yield call(auth.fetch, uri, {
      method: 'PUT',
      headers: {'Content-Type': 'text/plain'},
      body: JSON.stringify(view)
    });

    const session = yield getSessionOrLogin();
    const { webId } = session;

    const logStatus = webId ? `You are logged in as ${webId}.` : 'You are not logged in.';
    if (res.status === 401) {
      message.error(`
        The request returned 401 - unauthorized.
        ${logStatus}
        Either you don't have access to the requested resource or the permissions on it are not set up correctly.
      `);
    } else if (res.status < 200 || res.status >= 300) {
      message.error('An error occured while trying to save the view.')
    }
  } catch (e) {
    message.error('An error occured while trying to save the view.')
  }
}


function* saveOwnView({uri}) {
  const view = yield select(getViewSelection);

  // FIXME: Extract url sanitization
  const {webId} = yield getSessionOrLogin();
  const {origin} = new URL(webId);

  uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided
  uri = uri.replace(/(.json)?$/, '.json');

  const loading = message.loading('Saving view...');
  const errMsg = 'An error occured while trying to save the view.';
  try {
    const res = yield call(auth.fetch, uri, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(view)
    });

    const logStatus = webId ? `You are logged in as ${webId}.` : 'You are not logged in.';
    if (res.status === 401) {
      message.error(`
        The request returned 401 - unauthorized.
        ${logStatus}
        Either you don't have access to the requested resource or the permissions on it are not set up correctly.
      `);
    } else if (res.status < 200 || res.status >= 300) {
      message.error(errMsg)
    } else {
      message.success('New view created');
    }
  } catch (e) {
    message.error(errMsg)
  } finally {
    loading();
  }

  yield loadFiles({url: uri.replace(/\/[^/]*$/, '')});
}

function* loadOwnView({uri}) {
  const {webId} = yield getSessionOrLogin();
  const {origin} = new URL(webId);

  const loading = message.loading('Loading view...');
  const errMsg = 'There was an error loading the view. Please make sure it corresponds to the data schema.';
  uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`
  console.log(uri);
  try {
    const res = yield call(auth.fetch, uri);
    if (res.status < 200 || res.status >= 300) {
      message.error(errMsg)
    } else {
      const json = yield res.json();
      yield put(ModelActions.Creators.r_deselectAll());
      yield put(ModelActions.Creators.r_viewLoaded(json));
      message.success('View loaded');
    }
  } catch (e) {
    message.error(errMsg)
  } finally {
    loading();
  }
}

function* deleteFile({uri}) {
  const loading = message.loading('Deleting view...');
  try {
    const {webId} = yield getSessionOrLogin();
    const {origin} = new URL(webId);
    uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided

    const res = yield call(auth.fetch, uri, { method: 'DELETE'});

    if (res.status < 200 || res.status >= 300) {
      message.error('An error occured while trying to delete the view.')
    } else {
      message.success('View deleted');
      const filePath = ['/'].concat(uri.replace(origin, '').split('/')).filter(identity);
      yield put(SolidActions.Creators.r_fileDeleted(filePath));
    }
  } catch (e) {
    message.error('An error occured while trying to delete the view.')
  } finally {
    loading();
  }
}

function* loadExternalView({uri}) {
  try {
    const res = yield call(auth.fetch, uri);
    const session = yield getSessionOrLogin();
    const { webId } = session || {};

    const logStatus = webId ? `You are logged in as ${webId}.` : 'You are not logged in.';
    if (res.status >= 200 && res.status < 300) {
      const json = yield res.json();
      yield put(ModelActions.Creators.r_deselectAll());
      yield put(ModelActions.Creators.r_viewLoaded(json));
    } else if (res.status === 401) {
      message.error(`
        The request returned 401 - unauthorized.
        ${logStatus}
        Either you don't have access to the requested resource or the permissions on it are not set up correctly.
      `);
    } else {
      message.error('An error occured while trying to load the view.')
    }
  } catch (e) {
    message.error('An error occured while trying to load the view.')
  }
}

function* tryCreateFolder(folderUri) {
  // TODO: Check for proper uri
  // Need to remove last slash otherwise match wouldn't work properly
  folderUri = folderUri.replace(/\/*$/, '');
  const [, uri, folderName] = /(.*)\/(.*)/.exec(folderUri);

  try {
    const result = yield call(auth.fetch, uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/turtle',
        Slug: folderName,
        Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"',
      },
      body: ''
    });
    return result.status >= 200 && result.status < 300;
  } catch(e) {
    console.error(e);
    return false;
  }
}

// function* onSaveFolderUri({ uri: folderUri }) {
//   let error, test = {};
//   try {
//     test = yield call(auth.fetch, folderUri);
//   } catch (e) {
//     error = true;
//   }
//
//   if (error || test.status < 200 || test.status >= 300) {
//     // Folder not found, try creating it
//     const folderCreated = yield tryCreateFolder(folderUri);
//
//     if (!folderCreated) {
//       message.error(`Cannot fetch given folder uri: ${folderUri}. Please check the URI and access rights on the SOLID pod and try again.`);
//       yield put(SolidActions.Creators.r_resetFolderUri());
//       yield put(SolidActions.Creators.r_toggleFolderUriChanging(false));
//       return;
//     } else {
//       message.success(`Folder successfully created at ${folderUri}`);
//     }
//   }
//
//   const settingsFileUri = yield getSettingsFileUri();
//   let folderUris = yield loadFolderUris();
//   folderUris = folderUris.map(uri => `<${uri}>`).join(',');
//
//   const deleteData = folderUris.length ? `DELETE DATA { <${window.origin}> ws:storage ${folderUris}. };` : '';
//
//   const res = yield call(auth.fetch, settingsFileUri, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/sparql-update'
//     },
//     body: `
//     @prefix ws: <http://www.w3.org/ns/pim/space#>.
//     @prefix acl: <http://www.w3.org/ns/auth/acl#>.
//     ${deleteData}
//     INSERT DATA { <${window.origin}> a acl:agent; ws:storage <${folderUri}>. }`
//   });
//   if (res.status >= 200 && res.status < 300) {
//     yield put(SolidActions.Creators.r_setFolderUri(folderUri));
//     yield fetchViews();
//   } else {
//     yield put(SolidActions.Creators.r_resetFolderUri());
//     message.error('An error occurred while saving the folder uri to /settings/prefs.ttl. Please check the uri provided and access permissions again.')
//   }
//   yield put(SolidActions.Creators.r_toggleFolderUriChanging(false));
// }

function* updateAvatar(webId) {
  const store = rdf.graph();
  const ttl = yield auth.fetch(webId).then(data => data.text());
  rdf.parse(ttl, store, webId);
  const vCard = rdf.Namespace('http://www.w3.org/2006/vcard/ns#')
  const hasPhoto = vCard('hasPhoto');
  const avatar = path([0, 'object', 'value'], store.statementsMatching(null, hasPhoto, null));
  yield put(SolidActions.set('avatar', avatar));
}

function* onLoggedIn() {
  const {session: {webId}} = yield getSession();
  yield loadFiles({url: new URL(webId).origin});
  yield updateAvatar(webId);
}

function* onStart() {
  const {session, valid} = yield getSession();

  if (valid) {
    yield onLoggedIn();
    yield put(SolidActions.Creators.r_setSolidSession(session));
  } else {
    yield auth.logout();
  }
}

function* onLogout() {
  yield call(auth.logout);
  yield put(SolidActions.Creators.r_solidLoggedOut());
}

function* loadFiles({url}) {
  const {webId} = yield getSessionOrLogin();
  const {origin} = new URL(webId);

  url = `${origin}/${url.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided
  url = url.replace(/\/?$/, '/');
  const suffix = s => s.replace(url, '');
  const isTypeValid = s => s.match(/.json$/);
  const getValue = pipe(path(['subject', 'value']), suffix, replace(/\/$/, ''));
  const filePath = ['/'].concat(url.replace(origin, '').split('/')).filter(identity);
  const res = yield auth.fetch(url);
  const ttl = yield res.text();

  const store = rdf.graph();
  rdf.parse(ttl, store, url);
  const LDP = rdf.Namespace('http://www.w3.org/ns/ldp#')
  const NS = rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');

  const resource = LDP('Resource');
  const container = LDP('Container');
  const type = NS('type');

  const folders = store.statementsMatching(null, type, container)
    .map(getValue)
    .reduce((acc, folderUrl) => {
      if (folderUrl !== suffix(url)) {
        return Object.assign(acc, {[folderUrl]: { __loaded: false }});
      }

      return acc;
    }, {});

  const files = store.statementsMatching(null, type, resource)
    .map(getValue)
  .filter(name => !folders[name] && isTypeValid(name))
    .reduce((acc, name) => Object.assign(acc, {[name]: null}), {});

  yield put(SolidActions.Creators.r_filesLoaded(assocPath(filePath, {...folders, ...files, __loaded: true}, {})));
}

export default function*() {
  yield all([
    takeEvery(SolidActions.Types.S_ON_VIEW_SAVE, onViewSave),
    takeEvery(SolidActions.Types.S_LOAD_OWN_VIEW, loadOwnView),
    takeEvery(SolidActions.Types.S_ON_SOLID_LOGIN, onLogin),
    takeEvery(SolidActions.Types.S_ON_SOLID_LOGOUT, onLogout),
    takeEvery(SolidActions.Types.S_ON_SOLID_START, onStart),
    // takeEvery(SolidActions.Types.S_SAVE_FOLDER_URI, onSaveFolderUri),
    takeEvery(SolidActions.Types.S_DELETE_FILE, deleteFile),
    takeEvery(SolidActions.Types.S_LOAD_FILES, loadFiles),
    takeEvery(SolidActions.Types.S_SAVE_OWN_VIEW, saveOwnView)
  ]);
}
