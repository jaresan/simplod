/**
 * @file Lifecycle methods of the application.
 * @module @@actions/solid/lifecycle
 */
import { dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import auth from 'solid-auth-client';
import { loadFiles } from '@@actions/solid/files';
import rdf from 'rdflib';
import { path } from 'ramda';
import { getSession } from '@@actions/solid/auth';

/**
 * Triggered on Solid authentication.
 * Sets the session and runs the loggedIn routine.
 * @function
 * @returns {Promise<void>}
 */
export const onSolidStart = async ()  => {
  const {session, valid} = await getSession();

  if (valid) {
    await onLoggedIn();
    dispatchSet(SolidState.session, session);
  } else {
    await auth.logout();
  }
}

/**
 * Updates users avatar image.
 * @function
 * @param webId
 * @returns {Promise<void>}
 */
const updateAvatar = async webId  => {
  const store = rdf.graph();
  const ttl = await auth.fetch(webId).then(data => data.text());
  rdf.parse(ttl, store, webId);
  const vCard = rdf.Namespace('http://www.w3.org/2006/vcard/ns#')
  const hasPhoto = vCard('hasPhoto');
  const avatar = path([0, 'object', 'value'], store.statementsMatching(null, hasPhoto, null));
  dispatchSet(SolidState.avatar, avatar);
}

/**
 * Run when the user is logged in.
 * Fetches their files from their Solid Pod and updates the avatar image.
 * @function
 * @returns {Promise<void>}
 */
export const onLoggedIn = async ()  => {
  const {session: {webId}} = await getSession();
  await loadFiles(new URL(webId).origin);
  await updateAvatar(webId);
}
