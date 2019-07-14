import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { getViewSelection } from 'src/selectors';
import Actions from 'src/actions';
import auth from 'solid-auth-client';
import rdf from 'rdflib';


// FIXME: Add list of views from folderuri
// FIXME: Generate views as ttl? --> set its file type to smth like xx:view
// FIXME: When creating a new view focus a newly created input in the view list and save there
// FIXME: Add load/delete buttons next to views in the list
function* onViewSave({ payload: { uri } }) {
  const view = yield select(getViewSelection);
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
      alert('An error occured while trying to load the view.')
    }
  } catch (e) {
    alert('An error occured while trying to save the view.')
  }
}

function* onViewLoad({ payload: { uri } }) {
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

function* loadFolderUri() {
  let ttl = yield call(auth.fetch, 'https://jaresan.solid.community/settings/prefs.ttl');
  ttl = yield ttl.text();

  const store = new rdf.graph();
  rdf.parse(ttl, store, 'https://jaresan.solid.community/settings/prefs.ttl');

  const WS = new rdf.Namespace('http://www.w3.org/ns/pim/space#');
  const me = new rdf.sym(window.origin);
  const storage = store.any(me, WS('storage'));

  let folderUri = '';
  if (storage) {
    folderUri = storage.value;
  }

  return folderUri;
}

function* onSaveFolderUri({ payload }) {
  const res = yield call(auth.fetch, 'https://jaresan.solid.community/settings/prefs.ttl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/sparql-update'
    },
    body: `
    @prefix ws: <http://www.w3.org/ns/pim/space#>.
    @prefix acl: <http://www.w3.org/ns/auth/acl#>.
    INSERT DATA { 
      <${window.origin}> 
        a acl:agent; 
        ws:storage <${payload}>. 
    }`
  });
  if (res.status >= 200 && res.status < 300) {
    yield put(Actions.Creators.r_setFolderUri(payload));
  } else {
    alert('An error occurred while saving the folder uri to /settings/prefs.ttl. Please check the uri provided and access permissions again.')
  }
}

function* onStart() {
  const session = yield call(auth.currentSession);

  if (session) {
    yield onLogin();
  }
}

function* onLogin() {
  let session = yield call(auth.currentSession);
  if (!session) {
    const popupUri = 'https://solid.community/common/popup.html';
    session = yield call(auth.popupLogin, { popupUri });
  }
  yield put(Actions.Creators.r_setSolidSession(session));

  const folderUri = yield loadFolderUri();
  yield put(Actions.Creators.r_setFolderUri(folderUri));
}

function* onLogout() {
  yield call(auth.logout);
  yield put(Actions.Creators.r_solidLoggedOut());
}


export default function*() {
  yield all([
    takeEvery(Actions.Types.s_onViewSave, onViewSave),
    takeEvery(Actions.Types.s_onViewLoad, onViewLoad),
    takeEvery(Actions.Types.s_onSolidLogin, onLogin),
    takeEvery(Actions.Types.s_onSolidLogout, onLogout),
    takeEvery(Actions.Types.s_onSolidStart, onStart),
    takeEvery(Actions.Types.s_saveFolderUri, onSaveFolderUri),
  ]);
}
