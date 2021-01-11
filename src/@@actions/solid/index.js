import { getViewSelection } from '@@selectors';
import {dispatchSet, dispatch, getState} from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import * as ModelState from '@@app-state/model/state';
import {pipe, path, assocPath, identity, replace, view, mergeDeepRight} from 'ramda';
import {message} from 'antd';
import auth from 'solid-auth-client';
import rdf from 'rdflib';
import { generateSaveData, loadData } from '@@actions/save-load';
import { saveFile } from '@@actions/solid/save';

// FIXME: Move all predicate etc specifiers to constants
// TODO: Split to multiple different files in a 'solid' directory

const login = async ()  => {
  const popupUri = 'dist-popup/popup.html';
  const session = await auth.popupLogin({ popupUri });
  dispatchSet(SolidState.session, session);

  return session;
}

export const onSolidLogin = async ()  => {
  await login();
  await onLoggedIn();
}

const getSession = async ()  => {
  const session = await auth.currentSession();
  const expiration = path(['idClaims', 'exp'], session) * 1000;
  return {
    session,
    valid: expiration > Date.now()
  };
}

const getSessionOrLogin = async ()  => {
  const {session, valid} = await getSession();
  if (!valid) {
    return await login();
  } else {
    return session;
  }
}

export const onViewSave = async uri  => {
  const view = getViewSelection(getState());

  // FIXME: Add entry to folderUri settings file && the file itself
  try {
    const res = await auth.fetch(uri, {
      method: 'PUT',
      headers: {'Content-Type': 'text/plain'},
      body: JSON.stringify(view)
    });

    const session = await getSessionOrLogin();
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


export const saveOwnView = async uri  => {
  const saveData = generateSaveData();

  // FIXME: Extract url sanitization
  const {webId} = await getSessionOrLogin();
  const {origin} = new URL(webId);

  uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided
  uri = uri.replace(/(.json)?$/, '.json');

  await saveFile({uri, data: saveData, webId});
  await loadFiles(uri.replace(/\/[^/]*$/, ''));
}

export const loadOwnView = async uri  => {
  const {webId} = await getSessionOrLogin();
  const {origin} = new URL(webId);

  const loading = message.loading('Loading view...');
  const errMsg = 'There was an error loading the view. Please make sure it corresponds to the data schema.';
  uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`
  try {
    const res = await auth.fetch(uri);
    if (res.status < 200 || res.status >= 300) {
      message.error(errMsg)
    } else {
      const json = await res.json();
      dispatch(ModelState.deselectAll);
      loadData(json);
      message.success('View loaded');
    }
  } catch (e) {
    console.error(e);
    message.error(errMsg)
  } finally {
    loading();
  }
}

export const deleteFile = async uri  => {
  const loading = message.loading('Deleting view...');
  try {
    const {webId} = await getSessionOrLogin();
    const {origin} = new URL(webId);
    uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided

    const res = await auth.fetch(uri, { method: 'DELETE'});

    if (res.status < 200 || res.status >= 300) {
      message.error('An error occured while trying to delete the view.')
    } else {
      message.success('View deleted');
      const filePath = ['/'].concat(uri.replace(origin, '').split('/')).filter(identity);
      dispatch(SolidState.deleteFile(filePath));
    }
  } catch (e) {
    console.error(e);
    message.error('An error occured while trying to delete the view.')
  } finally {
    loading();
  }
}

// const loadExternalView = async uri  => {
//   try {
//     const res = await auth.fetch(uri);
//     const session = await getSessionOrLogin();
//     const { webId } = session || {};
//
//     const logStatus = webId ? `You are logged in as ${webId}.` : 'You are not logged in.';
//     if (res.status >= 200 && res.status < 300) {
//       const json = await res.json();
//       dispatch(ModelState.deselectAll);
//       dispatch(ModelState.loadView(json));
//     } else if (res.status === 401) {
//       message.error(`
//         The request returned 401 - unauthorized.
//         ${logStatus}
//         Either you don't have access to the requested resource or the permissions on it are not set up correctly.
//       `);
//     } else {
//       message.error('An error occured while trying to load the view.')
//     }
//   } catch (e) {
//     message.error('An error occured while trying to load the view.')
//   }
// }
//
// const tryCreateFolder = async folderUri  => {
//   // TODO: Check for proper uri
//   // Need to remove last slash otherwise match wouldn't work properly
//   folderUri = folderUri.replace(/\/*$/, '');
//   const [, uri, folderName] = /(.*)\/(.*)/.exec(folderUri);
//
//   try {
//     const result = await auth.fetch(uri, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'text/turtle',
//         Slug: folderName,
//         Link: '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"',
//       },
//       body: ''
//     });
//     return result.status >= 200 && result.status < 300;
//   } catch(e) {
//     console.error(e);
//     return false;
//   }
// }

// const onSaveFolderUri = async ({ uri: folderUri })  => {
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

const updateAvatar = async webId  => {
  const store = rdf.graph();
  const ttl = await auth.fetch(webId).then(data => data.text());
  rdf.parse(ttl, store, webId);
  const vCard = rdf.Namespace('http://www.w3.org/2006/vcard/ns#')
  const hasPhoto = vCard('hasPhoto');
  const avatar = path([0, 'object', 'value'], store.statementsMatching(null, hasPhoto, null));
  dispatchSet(SolidState.avatar, avatar);
}

const onLoggedIn = async ()  => {
  const {session: {webId}} = await getSession();
  await loadFiles(new URL(webId).origin);
  await updateAvatar(webId);
}

export const onSolidStart = async ()  => {
  const {session, valid} = await getSession();

  if (valid) {
    await onLoggedIn();
    dispatchSet(SolidState.session, session);
  } else {
    await auth.logout();
  }
}

export const onSolidLogout = async ()  => {
  await auth.logout();
  dispatch(SolidState.logOut())
}

export const loadFiles = async url  => {
  const {webId} = await getSessionOrLogin();
  const {origin} = new URL(webId);

  url = `${origin}/${url.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided
  url = url.replace(/\/?$/, '/');
  const suffix = s => s.replace(url, '');
  const isTypeValid = s => s.match(/.json$/);
  const getValue = pipe(path(['subject', 'value']), suffix, replace(/\/$/, ''));
  const filePath = ['/'].concat(url.replace(origin, '').split('/')).filter(identity);
  const res = await auth.fetch(url);
  const ttl = await res.text();

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

  const state = getState();
  const oldFiles = view(SolidState.files, state);
  const newFiles = assocPath(filePath, {...folders, ...files, __loaded: true}, {});
  dispatchSet(SolidState.files, mergeDeepRight(oldFiles, newFiles));
}
