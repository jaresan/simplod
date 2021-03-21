import React from 'react';
import { message, notification } from 'antd';
import auth from 'solid-auth-client';
import { dispatch, dispatchSet } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SolidState from '@@app-state/solid/state';
import { getSession, getSessionOrLogin } from '@@actions/solid/auth';
import { identity, tap } from 'ramda';
import { translated } from '@@localization';
import { WithRetry } from '@@components/controls/with-retry';

const notifyUnauthorized = async () => {
  const {webId} = await getSession();
  const logStatus = webId ? translated(`You are logged in as ${webId}.`) : translated('You are not logged in.');
  notification.error({
    message: 'Unauthorized',
    description: `${logStatus}
      ${translated('Either you don\'t have access to the requested resource or the permissions on it are not set up correctly.')}`,
    duration: 8
  });
}

export const fetchFile = async url => {
  const res = await auth.fetch(url);

  if (res.status === 401) {
    await notifyUnauthorized();
    throw new Error('Unauthenticated');
  } else if (res.status < 200 || res.status >= 300) {
    console.log(res);
    message.error('An error occured while trying to fetch the file.')
  }

  return res;
}

const notifyAboutFailure = ({retryFn, uri}) => {
  const notificationKey = 'solid-fail-notification';
  const closeNotification = () => notification.close(notificationKey);
  notification.error({
    duration: 0,
    key: notificationKey,
    message: 'File save failed',
    description: <WithRetry
      retryFn={retryFn}
      retryTime={4000}
      maxRetries={3}
      onSuccess={closeNotification}
      onFail={() => {
        closeNotification();
        notification.error({message: translated(`Saving to ${uri} failed`)});
      }}
      onCancel={closeNotification}
    >
      <div>Saving the file to {uri} failed, retrying...</div>
    </WithRetry>
  });
};

export const saveFile = async ({uri, data}) => {
  const loading = message.loading('Saving view...');
  const trySave = () => auth.fetch(uri, {
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(tap(() => {
    notification.success({message: translated(`Saved to ${uri}!`)});
    dispatchSet(SolidState.modelFileLocation, uri);
    dispatchSet(ModelState.dirty, false);
  }));
  try {
    const res = await trySave();

    if (res.status === 401) {
      await notifyUnauthorized();
    } else if (res.status < 200 || res.status >= 300) {
      notifyAboutFailure({retryFn: trySave, uri})
    }
  } catch (e) {
    console.error(e);
    notifyAboutFailure({retryFn: trySave, uri})
  } finally {
    loading();
  }
};

export const changePermissions = async ({uri, permissions}) => {
  const {webId} = await getSessionOrLogin();
  const loading = message.loading('Setting permissions...');
  const errMsg = 'An error occurred while trying change the permissions.';

  // TODO: Use RDF graph, not direct string interpolation.
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
      message.success('Updated permissions!');
    }
  } catch (e) {
    message.error(errMsg)
  } finally {
    loading();
  }
};


export const deleteFile = async uri  => {
  const loading = message.loading('Deleting view...');
  try {
    const {webId} = await getSessionOrLogin();
    const {origin} = new URL(webId);
    uri = `${origin}/${uri.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided

    const res = await auth.fetch(uri, {method: 'DELETE'});

    if (res.status < 200 || res.status >= 300) {
      message.error(translated('An error occured while trying to delete the view.'));
    } else {
      message.success(translated(`${uri} deleted.`));
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

export const hasPermissions = async (uri, write) => {
  try {
    const json = await auth.fetch(uri).then(a => a.json());
    if (!write) return true;
    return auth.fetch(uri, {method: 'PUT', body: JSON.stringify(json)}).then(({status}) => status >= 200 && status < 300);
  } catch (e) {
    return false;
  }
}
