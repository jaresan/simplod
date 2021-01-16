import auth from 'solid-auth-client';
import { path } from 'ramda';
import { dispatch, dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import { onLoggedIn } from '@@actions/solid/lifecycle';

const login = async ()  => {
  const popupUri = 'dist-popup/popup.html';
  const session = await auth.popupLogin({ popupUri });
  dispatchSet(SolidState.session, session);

  return session;
}

export const loginToSolid = async ()  => {
  await login();
  await onLoggedIn();
}

export const logoutSolid = async ()  => {
  await auth.logout();
  dispatch(SolidState.logOut())
}

export const getSession = async ()  => {
  const session = await auth.currentSession();
  const expiration = path(['idClaims', 'exp'], session) * 1000;
  return {
    session,
    valid: expiration > Date.now()
  };
}

export const getSessionOrLogin = async ()  => {
  const {session, valid} = await getSession();
  if (!valid) {
    return await login();
  } else {
    return session;
  }
}
