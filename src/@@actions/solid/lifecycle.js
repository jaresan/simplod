import { dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import auth from 'solid-auth-client';
import { loadFiles } from '@@actions/solid/index';
import rdf from 'rdflib';
import { path } from 'ramda';
import { getSession } from '@@actions/solid/auth';

export const onSolidStart = async ()  => {
  const {session, valid} = await getSession();

  if (valid) {
    await onLoggedIn();
    dispatchSet(SolidState.session, session);
  } else {
    await auth.logout();
  }
}

const updateAvatar = async webId  => {
  const store = rdf.graph();
  const ttl = await auth.fetch(webId).then(data => data.text());
  rdf.parse(ttl, store, webId);
  const vCard = rdf.Namespace('http://www.w3.org/2006/vcard/ns#')
  const hasPhoto = vCard('hasPhoto');
  const avatar = path([0, 'object', 'value'], store.statementsMatching(null, hasPhoto, null));
  dispatchSet(SolidState.avatar, avatar);
}

export const onLoggedIn = async ()  => {
  const {session: {webId}} = await getSession();
  await loadFiles(new URL(webId).origin);
  await updateAvatar(webId);
}
