import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { getFolderUri, getViewSelection } from '../selectors';
import Actions from 'src/actions/solid';
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
      alert(`
        The request returned 401 - unauthorized.
        ${logStatus}
        Either you don't have access to the requested resource or the permissions on it are not set up correctly.
      `);
    } else if (res.status < 200 || res.status >= 300) {
      alert('An error occured while trying to save the view.')
    }
  } catch (e) {
    alert('An error occured while trying to save the view.')
  }

  yield fetchViews();
}

function* onViewLoad({uri}) {
  try {
    const res = yield call(auth.fetch, uri);
    const session = yield auth.currentSession();
    const { webId } = session || {};

    const logStatus = webId ? `You are logged in as ${webId}.` : 'You are not logged in.';
    if (res.status >= 200 && res.status < 300) {
      const json = yield res.json();
      yield put(Actions.Creators.r_viewLoaded(json));
    } else if (res.status === 401) {
      alert(`
        The request returned 401 - unauthorized.
        ${logStatus}
        Either you don't have access to the requested resource or the permissions on it are not set up correctly.
      `);
    } else {
      alert('An error occured while trying to load the view.')
    }
  } catch (e) {
    alert('An error occured while trying to load the view.')
  }
}

function* fetchViews() {
  const folderUri = yield select(getFolderUri);
  if (!folderUri) return;

  try {
    let folderContent = yield call(auth.fetch, folderUri);
    folderContent = yield folderContent.text();

    const store = new rdf.graph();
    rdf.parse(folderContent, store, folderUri);

    const resource = new rdf.Namespace('http://www.w3.org/ns/ldp#')('Resource');
    const type = rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')('type');
    const viewUris = store.statementsMatching(null, type, resource).map(s => s.subject.value);

    yield put(Actions.Creators.r_setExistingViews(viewUris));
  } catch (e) {
    alert(`There was a problem fetching saved views from ${folderUri}. Please recheck the uri and try again.`)
  }
}

function* onDeleteView({uri: viewUri}) {
  try {
    const res = yield call(auth.fetch, viewUri, { method: 'DELETE'});

    if (res.status >= 200 && res.status < 300) {
      yield put(Actions.Creators.r_viewDeleted(viewUri));
    } else {
      alert('An error occured while trying to delete the view.')
    }
  } catch (e) {
    alert('An error occured while trying to delete the view.')
  }
}

function* loadFolderUris() {
  let folderUris = [''];

  try {
    let session = yield auth.currentSession();
    const { webId } = session || {};

    const { origin } = new URL(webId);
    let ttl = yield call(auth.fetch, `${origin}/settings/prefs.ttl`);
    ttl = yield ttl.text();

    const store = new rdf.graph();
    rdf.parse(ttl, store, `${origin}/settings/prefs.ttl`);

    const WS = new rdf.Namespace('http://www.w3.org/ns/pim/space#');
    const me = new rdf.sym(window.origin);
    folderUris = store.statementsMatching(me, WS('storage')).map(r => r.object.value);
  } catch (e) {
    alert('An error occurred while getting the folder uri from /settings/prefs.ttl. Please make sure https://jaresan.github.io is in your trusted apps in your SOLID pod at profile/card#me.')
  }

  return folderUris;
}

function* loadFolderUri() {
  const uris = yield loadFolderUris();
  return uris[uris.length - 1] || '';
}


function* tryCreateFolder(folderUri) {
  // TODO: Check for proper uri
  // Need to remove last slash otherwise match wouldn't work properly
  folderUri = folderUri.replace(/\/*$/, '');
  const [_, uri, folderName] = /(.*)\/(.*)/.exec(folderUri);

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
    return result.status > 200 && result.status < 300;
  } catch(e) {
    console.error(e);
    return false;
  }
}

function* getSettingsFileUri() {
  let session = yield auth.currentSession();
  const { webId } = session || {};
  const profile = new URL(webId);
  const profileOrigin = profile.origin;


  const predicate = rdf.Namespace('http://www.w3.org/ns/pim/space#')('preferencesFile');
  const subject = rdf.Namespace(profileOrigin)('#me');
  const store = new rdf.graph();
  let ttl = yield call(auth.fetch, profile);
  ttl = yield ttl.text();
  rdf.parse(ttl, store, profileOrigin);

  return store.any(subject, predicate, null).value;
}

function* onSaveFolderUri({ uri: folderUri }) {
  let error, test = {};
  try {
    test = yield call(auth.fetch, folderUri);
  } catch (e) {
    error = true;
  }

  if (error || test.status < 200 || test.status >= 300) {
    // Folder not found, try creating it
    const folderCreated = yield tryCreateFolder(folderUri);

    if (!folderCreated) {
      alert(`Cannot fetch given folder uri: ${folderUri}. Please check the URI and access rights on the SOLID pod and try again.`);
      yield put(Actions.Creators.r_resetFolderUri());
      yield put(Actions.Creators.r_toggleFolderUriChanging(false));
      return;
    } else {
      alert(`Folder successfully created at ${folderUri}`);
    }
  }

  const settingsFileUri = yield getSettingsFileUri();
  let folderUris = yield loadFolderUris();
  folderUris = folderUris.map(uri => `<${uri}>`).join(',');

  const deleteData = folderUris.length ? `DELETE DATA { <${window.origin}> ws:storage ${folderUris}. };` : '';

  const res = yield call(auth.fetch, settingsFileUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/sparql-update'
    },
    body: `
    @prefix ws: <http://www.w3.org/ns/pim/space#>.
    @prefix acl: <http://www.w3.org/ns/auth/acl#>.
    ${deleteData}
    INSERT DATA { <${window.origin}> a acl:agent; ws:storage <${folderUri}>. }`
  });
  if (res.status >= 200 && res.status < 300) {
    yield put(Actions.Creators.r_setFolderUri(folderUri));
    yield fetchViews();
  } else {
    yield put(Actions.Creators.r_resetFolderUri());
    alert('An error occurred while saving the folder uri to /settings/prefs.ttl. Please check the uri provided and access permissions again.')
  }
  yield put(Actions.Creators.r_toggleFolderUriChanging(false));
}

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
    const popupUri = 'https://solid.community/common/popup.html';
    session = yield call(auth.popupLogin, { popupUri });
  }
  yield put(Actions.Creators.r_setSolidSession(session));

  const folderUri = yield loadFolderUri();
  yield put(Actions.Creators.r_setFolderUri(folderUri));
  yield put(Actions.Creators.r_toggleFolderUriChanging(false));
  yield fetchViews();
}

function* onLogout() {
  yield call(auth.logout);
  yield put(Actions.Creators.r_solidLoggedOut());
}


export default function*() {
  yield all([
    takeEvery(Actions.Types.S_ON_VIEW_SAVE, onViewSave),
    takeEvery(Actions.Types.S_ON_VIEW_LOAD, onViewLoad),
    takeEvery(Actions.Types.S_ON_SOLID_LOGIN, onLogin),
    takeEvery(Actions.Types.S_ON_SOLID_LOGOUT, onLogout),
    takeEvery(Actions.Types.S_ON_SOLID_START, onStart),
    takeEvery(Actions.Types.S_SAVE_FOLDER_URI, onSaveFolderUri),
    takeEvery(Actions.Types.S_DELETE_VIEW, onDeleteView),
  ]);
}
