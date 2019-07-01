import { takeEvery, select, call, put } from 'redux-saga/effects';
import { getViewSelection } from 'src/selectors';
import Actions from 'src/actions';
import auth from 'solid-auth-client';

function* onViewSave({ payload: { uri } }) {
  const view = yield select(getViewSelection);
  try {
    const res = yield call(auth.fetch, uri, {
      method: 'PUT',
      headers: {'Content-Type': 'text'},
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


export default function*() {
  yield [
    takeEvery(Actions.Types.s_onViewSave, onViewSave),
    takeEvery(Actions.Types.s_onViewLoad, onViewLoad),
  ];
}
