import { message } from 'antd';
import auth from 'solid-auth-client';
import { dispatch, dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import { getSessionOrLogin } from '@@actions/solid/auth';
import { identity } from 'ramda';

export const fetchFile = async url => {
  const {webId} = await getSessionOrLogin();
  const {origin} = new URL(webId);
  url = `${origin}/${url.replace(origin, '').replace(/^\//, '')}`; // Enforce domain if relative URL provided

  const res = await auth.fetch(url, {headers: {'Accept': 'application/json'}}).then(a => a.json());

  if (res.status < 200 || res.status >= 300) {
    message.error('An error occured while trying to fetch the file.')
  } else if (res.status === 401) {
    message.error(`
      The request returned 401 - unauthorized.
      Either you don't have access to the requested resource or the permissions on it are not set up correctly.
    `);
  }

  return res;
}

export const saveFile = async ({uri, data, webId}) => {
  const loading = message.loading('Saving view...');
  const errMsg = 'An error occured while trying to save the view.';
  try {
    const res = await auth.fetch(uri, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    const logStatus = webId ? `You are logged in as ${webId}.` : 'You are not logged in.';
    if (res.status === 401) {
      message.error(`
        The request returned 401 - unauthorized.
        ${logStatus}
        Either you don't have access to the requested resource or the permissions on it are not set up correctly.
      `);
    } else if (res.status < 200 || res.status >= 300) {
      message.error(errMsg)
    } else {
      message.success('Saved successfully!');
      dispatchSet(SolidState.modelFileLocation, uri);
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
