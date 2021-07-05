import { getViewSelection } from '@@selectors';
import {dispatchSet, getState} from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import {pipe, path, assocPath, identity, replace, view, mergeDeepRight} from 'ramda';
import { message, notification } from 'antd';
import auth from 'solid-auth-client';
import rdf from 'rdflib';
import { generateSaveData } from '@@actions/save-load';
import { changePermissions, saveFile } from '@@actions/solid/files';
import { getSession, getSessionOrLogin } from '@@actions/solid/auth';

export const onViewSave = async uri  => {
  const view = getViewSelection(getState());

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
      notification.error(`
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

export const saveViewByUri = async (uri, permissions) => {
  const saveData = generateSaveData();
  const {valid} = await getSession();

  uri = uri.replace(/^\//, ''); // Enforce domain if relative URL provided
  uri = uri.replace(/(.json)?$/, '.json');

  await saveFile({uri, data: saveData});

  if (permissions) {
    await changePermissions({uri, permissions});
  }

  if (valid) {
    await loadFiles(uri.replace(/\/[^/]*$/, ''));
  }
};

export const getFileUrl = async relativePath => {
  const webId = view(SolidState.webId, getState());
  const url = new URL(webId);
  relativePath = relativePath.replace(/^\//, '');
  return `${url.origin}/${relativePath}`;
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
