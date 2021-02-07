import { message, notification } from 'antd';
import auth from 'solid-auth-client';
import { dispatch, dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import { getSession, getSessionOrLogin } from '@@actions/solid/auth';
import { identity } from 'ramda';
import * as ModelState from '@@app-state/model/state';

const notifyUnauthorized = async () => {
  const {webId} = await getSession();
  const logStatus = webId ? `You are logged in as ${webId}.` : 'You are not logged in.';
  notification.error({
    message: 'Unauthorized',
    description: `${logStatus}
      Either you don't have access to the requested resource or the permissions on it are not set up correctly.`,
    duration: 8
  });
}

export const fetchFile = async url => {
  const res = await auth.fetch(url, {headers: {'Accept': 'application/json'}});

  if (res.status === 401) {
    await notifyUnauthorized();
    throw new Error('Unauthenticated');
  } else if (res.status < 200 || res.status >= 300) {
    console.log(res);
    message.error('An error occured while trying to fetch the file.')
  }

  return res;
}

export const saveFile = async ({uri, data}) => {
  const loading = message.loading('Saving view...');
  const errMsg = 'An error occurred while trying to save the view.';
  try {
    const res = await auth.fetch(uri, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    if (res.status === 401) {
      await notifyUnauthorized();
    } else if (res.status < 200 || res.status >= 300) {
      message.error(errMsg)
    } else {
      message.success(`Saved to ${uri}!`);
      dispatchSet(SolidState.modelFileLocation, uri);
    }
  } catch (e) {
    message.error(errMsg)
  } finally {
    loading();
  }
  dispatchSet(ModelState.dirty, false);
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
      message.error('An error occured while trying to delete the view.')
    } else {
      message.success(`${uri} deleted.`);
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

export const hasPermissions = async (uri, write) => auth.fetch(uri, {method: write ? 'PUT' : 'GET'}).then(({status}) => status >= 200 && status < 300);
