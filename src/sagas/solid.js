import { takeEvery, select, call, put, all } from 'redux-saga/effects';
import { getFolderUri, getViewSelection } from '../selectors';
import Actions from 'src/actions';
import auth from 'solid-auth-client';
import rdf from 'rdflib';


function* onViewSave({ payload: { uri } }) {
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

function* onDeleteView({ payload: viewUri }) {
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

function* loadFolderUri() {
  let folderUri = '';
  try {
    let ttl = yield call(auth.fetch, 'https://jaresan.solid.community/settings/prefs.ttl');
    ttl = yield ttl.text();

    const store = new rdf.graph();
    rdf.parse(ttl, store, 'https://jaresan.solid.community/settings/prefs.ttl');

    const WS = new rdf.Namespace('http://www.w3.org/ns/pim/space#');
    const me = new rdf.sym(window.origin);
    const storage = store.any(me, WS('storage'));

    if (storage) {
      folderUri = storage.value;
    }
  } catch (e) {
    alert('An error occurred while getting the folder uri from /settings/prefs.ttl. Please make sure https://jaresan.github.io is in your trusted apps in your SOLID pod at profile/card#me.')
  }

  return folderUri;
}

function* onSaveFolderUri({ payload: folderUri }) {
  let error, test = {};
  try {
    test = yield call(auth.fetch, folderUri);
  } catch (e) {
    error = true;
  }

  if (error || test.status < 200 || test.status >= 300) {
    alert(`Cannot fetch given folder uri: ${folderUri}. Please check the URI and access rights on the SOLID pod and try again.`);
    yield put(Actions.Creators.r_resetFolderUri());
    yield put(Actions.Creators.r_toggleFolderUriChanging(false));
    return;
  }

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
        ws:storage <${folderUri}>. 
    }`
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
  yield put(Actions.Creators.r_toggleFolderUriChanging(false));
  yield fetchViews();

  // FIXME: Add list of views from folderuri
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
    takeEvery(Actions.Types.s_deleteView, onDeleteView),
  ]);
}
