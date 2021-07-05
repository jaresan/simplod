/**
 * @file Handles Solid client authentication
 * @module @@actions/solid/auth
 */

import auth from 'solid-auth-client';
import { path, prop } from 'ramda';
import { dispatch, dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import { onLoggedIn } from '@@actions/solid/lifecycle';

/**
 * Opens up a new login popup and waits for the user to login.
 * Sets user's session accordingly.
 * @function
 * @returns {Promise<*>}
 */
const login = async ()  => {
  const popupUri = 'dist-popup/popup.html';
  const session = await auth.popupLogin({ popupUri });
  dispatchSet(SolidState.session, session);

  return session;
}

/**
 * Prompts the user to log in to their Solid pod and fires appropriate lifecycle function on login.
 * @function
 * @returns {Promise<void>}
 */
export const loginToSolid = async ()  => {
  await login();
  await onLoggedIn();
}

/**
 * Logs the user out of Solid pod.
 * @function
 * @returns {Promise<void>}
 */
export const logoutSolid = async ()  => {
  await auth.logout();
  dispatch(SolidState.logOut())
}

/**
 * Returns the current user's session.
 * @function
 * @returns {Promise<{valid: boolean, session: *}>}
 */
export const getSession = async ()  => {
  const session = await auth.currentSession();
  const expiration = path(['idClaims', 'exp'], session) * 1000;
  return {
    session,
    valid: expiration > Date.now()
  };
}

/**
 * Returns whether the user is logged in or not.
 * @function
 * @returns {Promise<{valid: boolean, session: *}>}
 */
export const isLoggedIn = () => getSession().then(prop('valid'));

/**
 * Logs the user in, if they aren't yet, then returns the user's session.
 * @function
 * @returns {Promise<*>}
 */
export const getSessionOrLogin = async ()  => {
  const {session, valid} = await getSession();
  if (!valid) {
    return await login();
  } else {
    return session;
  }
}
