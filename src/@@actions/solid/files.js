/**
 * @file Handling of Solid pod files interaction. Deletions, saves, feedback on failed permissions etc.
 * @module @@actions/solid/files
 */
import React from 'react';
import { Button, message, notification, Space } from 'antd';
import auth from 'solid-auth-client';
import { dispatch, dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SolidState from '@@app-state/solid/state';
import { getSession, getSessionOrLogin } from '@@actions/solid/auth';
import { assocPath, identity, mergeDeepRight, path, pipe, replace, tap, view } from 'ramda';
import { translated } from '@@localization';
import { WithRetry } from '@@components/controls/with-retry';
import { downloadData, generateSaveData } from '@@actions/save';
import rdf from 'rdflib';

/**
 * Notifies the user that they are not authorized to use a requested resource.
 * @function
 * @returns {Promise<void>}
 */
const notifyUnauthorized = async () => {
  const {webId} = await getSession();
  const logStatus = webId ? translated('You are logged in as {webId}.', {webId}) : translated('You are not logged in.');
  notification.error({
    message: translated('Unauthorized'),
    description: `${logStatus}
      ${translated('Either you don\'t have access to the requested resource or the permissions on it are not set up correctly.')}`,
    duration: 8
  });
}

/**
 * Downloads a file using the Solid auth client.
 * Notifies the user if they're unauthorized.
 * @function
 * @param url
 * @returns {Promise<*>}
 */
export const fetchFile = async url => {
  const res = await auth.fetch(url);

  if (res.status === 401) {
    await notifyUnauthorized();
    throw new Error(translated('Unauthenticated'));
  } else if (res.status < 200 || res.status >= 300) {
    console.log(res);
    message.error(translated('An error occured while trying to fetch the file.'))
  }

  return res;
}

/**
 * Notifies the user that a save try has failed.
 * Retries the save command multiple times.
 * @function
 * @param retryFn
 * @param uri
 * @returns {Promise<unknown>}
 */
const notifyAboutFailureWithRetry = ({retryFn, uri}) => {
  const notificationKey = 'solid-fail-notification';
  const closeNotification = () => notification.close(notificationKey);

  return new Promise((res, rej) => {
    notification.error({
      duration: 0,
      key: notificationKey,
      message: translated('File save failed'),
      description: <WithRetry
        retryFn={retryFn}
        retryTime={4000}
        maxRetries={3}
        onSuccess={d => {
          closeNotification();
          res(d);
        }}
        onFail={e => {
          closeNotification();
          rej(e);
        }}
        onCancel={() => {
          closeNotification();
          res(null);
        }}
      >
        <div>{translated('Saving the file to {uri} failed, retrying...')}</div>
      </WithRetry>
    });
  });
};

/**
 * Saves the file using the Solid auth client to the given uri.
 * If fail saves, retries a given number of times.
 * @function
 * @param uri
 * @param data
 * @returns {Promise<*>}
 */
export const saveFile = async ({uri, data}) => {
  const loading = message.loading(translated('Saving view...'));
  const trySave = () => auth.fetch(uri, {
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(tap(() => {
    notification.success({message: translated('Saved to {uri}!', {uri})});
    dispatchSet(SolidState.modelFileLocation, uri);
    dispatchSet(ModelState.dirty, false);
  }));

  const onFail = () => {
    const key = 'save-failed-final-notification';
    notification.error({
      message: translated('Saving to {uri} failed', {uri}),
      key,
      description: <>
        <Space>
          <Button onClick={() => {
            notification.close(key);
            saveFile({uri, data});
          }}>{translated('Try again')}</Button>
          <Button onClick={() => {
            downloadData();
            notification.close(key);
          }}>{translated('Download file')}</Button>
        </Space>
      </>
    });
  }

  return trySave()
    .then(({status}) => {
      loading();
      if (status === 401) {
        notifyUnauthorized();
      } else if (status < 200 || status >= 300) {
        return Promise.reject(translated('Something went wrong.'));
      }
    })
    .catch(() => {
      loading();
      return notifyAboutFailureWithRetry({retryFn: trySave, uri});
    })
    .catch(() => onFail());
};

/**
 * Changes the permissions of a file at the given URI by modifying the file's .acl.
 * @function
 * @param uri
 * @param permissions
 * @returns {Promise<void>}
 */
export const changePermissions = async ({uri, permissions}) => {
  const {webId} = await getSessionOrLogin();
  const loading = message.loading(translated('Setting permissions...'));
  const errMsg = translated('An error occurred while trying change the permissions.');

  const publicPermissions = permissions.includes('public/write') ? 'acl:mode acl:Read, acl:Write.' : 'acl:mode acl:Read.';
  const publicPart = permissions.includes('public') ? `
    <#public>
      a acl:Authorization;
      acl:agentClass foaf:Agent;
      acl:accessTo <${uri}>;
      ${publicPermissions}
    ` : '';

  const data = `
    @prefix acl: <http://www.w3.org/ns/auth/acl#>.
    @prefix foaf: <http://xmlns.com/foaf/0.1/>.
    
    <#owner>
        a acl:Authorization;
        acl:agent <${webId}>;
        acl:accessTo <${uri}>;
        acl:mode acl:Read, acl:Write, acl:Control.
    ${publicPart}`;

  try {
    const res = await auth.fetch(`${uri}.acl`, {
      method: 'PUT',
      headers: {'Content-Type': 'text/turtle'},
      body: data
    });

    if (res.status === 401) {
      await notifyUnauthorized();
    } else if (res.status < 200 || res.status >= 300) {
      message.error(errMsg)
    } else {
      message.success(translated('Updated permissions!'));
    }
  } catch (e) {
    message.error(errMsg)
  } finally {
    loading();
  }
};

/**
 * Tries to delete a Solid Pod file hosted at uri.
 * @param uri
 * @returns {Promise<void>}
 */
export const deleteFile = async uri  => {
  const loading = message.loading(translated('Deleting view...'));
  try {
    const {webId} = await getSessionOrLogin();
    const {origin} = new URL(webId);
    uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided

    const res = await auth.fetch(uri, {method: 'DELETE'});

    if (res.status < 200 || res.status >= 300) {
      message.error(translated('An error occured while trying to delete the view.'));
    } else {
      message.success(translated('{uri} deleted.', {uri}));
      const filePath = ['/'].concat(uri.replace(origin, '').split('/')).filter(identity);
      dispatch(SolidState.deleteFile(filePath));
    }
  } catch (e) {
    console.error(e);
    message.error(translated('An error occured while trying to delete the view.'));
  } finally {
    loading();
  }
}

/**
 * Returns whether a user has read/write permissions to the resource under given uri.
 * @param uri
 * @param write
 * @returns {Promise<boolean|*>}
 */
export const hasPermissions = async (uri, write) => {
  try {
    const json = await auth.fetch(uri).then(a => a.json());
    if (!write) return true;
    return auth.fetch(uri, {method: 'PUT', body: JSON.stringify(json)}).then(({status}) => status >= 200 && status < 300);
  } catch (e) {
    return false;
  }
}


/**
 * Saves the current project at given uri.
 * Sets permissions if provided.
 * @function
 * @param uri
 * @param permissions
 * @returns {Promise<void>}
 */
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

/**
 * Returns absolute file URL for provided relative path based on user's Solid Pod.
 * @function
 * @param relativePath
 * @returns {Promise<string>}
 */
export const getFileUrl = async relativePath => {
  const webId = view(SolidState.webId, getState());
  const url = new URL(webId);
  relativePath = relativePath.replace(/^\//, '');
  return `${url.origin}/${relativePath}`;
}

/**
 * Fetches file and folder definitions from user's Solid Pod.
 * @function
 * @param url
 * @returns {Promise<void>}
 */
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

