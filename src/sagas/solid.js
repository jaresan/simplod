import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { getViewSelection } from '../selectors';
import SolidActions from 'src/actions/solid';
import ModelActions from 'src/actions/model';
import {pipe, path, assocPath, identity, replace} from 'ramda';
import {message} from 'antd';
import auth from 'solid-auth-client';
import rdf from 'rdflib';

// FIXME: Move all predicate etc specifiers to constants
// TODO: Split to multiple different files in a 'solid' directory

function* onViewSave({uri}) {
  const view = yield select(getViewSelection);

  // FIXME: Add entry to folderUri settings file && the file itself
  try {
    const res = yield call(auth.fetch, uri, {
      method: 'PUT',
      headers: {'Content-Type': 'text/plain'},
      body: JSON.stringify(view)
    });

    const session = yield auth.currentSession();
    const { webId } = session || {};

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

function* onViewLoad({uri}) {
  return;
  try {
    const res = yield call(auth.fetch, uri);
    const session = yield auth.currentSession();
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

function* onDeleteView({uri: viewUri}) {
  try {
    const res = yield call(auth.fetch, viewUri, { method: 'DELETE'});

    if (res.status >= 200 && res.status < 300) {
      yield put(SolidActions.Creators.r_viewDeleted(viewUri));
    } else {
      message.error('An error occured while trying to delete the view.')
    }
  } catch (e) {
    message.error('An error occured while trying to delete the view.')
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

function* onStart() {
  const session = yield auth.currentSession();

  // Automatically log in the user if they have their session saved
  if (session) {
    yield onLogin();
  }
}

function* onLogin() {
  let session = yield auth.currentSession();
  if (!session) {
    const popupUri = '/dist-popup/popup.html';
    session = yield call(auth.popupLogin, { popupUri });
  }
  yield put(SolidActions.Creators.r_setSolidSession(session));

  yield loadFiles({url: new URL(session.webId).origin});
}

function* onLogout() {
  yield call(auth.logout);
  yield put(SolidActions.Creators.r_solidLoggedOut());
}

function* loadFiles({url}) {
  const {webId} = yield auth.currentSession();
  const {origin} = new URL(webId);

  url = `${origin}/${url.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided
  url = url.replace(/\/?$/, '/');
  const suffix = s => s.replace(url, '');
  const getValue = pipe(path(['subject', 'value']), suffix, replace(/\/$/, ''));
  const filePath = ['/'].concat(url.replace(origin, '').split('/')).filter(identity);
  const res = yield auth.fetch(url);
  const ttl = yield res.text();

  const store = new rdf.graph();
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
    .filter(name => !folders[name])
    .reduce((acc, name) => Object.assign(acc, {[name]: null}), {});

  yield put(SolidActions.Creators.r_filesLoaded(assocPath(filePath, {...folders, ...files, __loaded: true}, {})));
}

export default function*() {
  yield all([
    takeEvery(SolidActions.Types.S_ON_VIEW_SAVE, onViewSave),
    takeEvery(SolidActions.Types.S_ON_VIEW_LOAD, onViewLoad),
    takeEvery(SolidActions.Types.S_ON_SOLID_LOGIN, onLogin),
    takeEvery(SolidActions.Types.S_ON_SOLID_LOGOUT, onLogout),
    takeEvery(SolidActions.Types.S_ON_SOLID_START, onStart),
    // takeEvery(SolidActions.Types.S_SAVE_FOLDER_URI, onSaveFolderUri),
    takeEvery(SolidActions.Types.S_DELETE_VIEW, onDeleteView),
    takeEvery(SolidActions.Types.S_LOAD_FILES, loadFiles)
  ]);
}
