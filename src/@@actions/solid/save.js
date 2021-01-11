import { message } from 'antd';
import auth from 'solid-auth-client';
import { dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';

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
