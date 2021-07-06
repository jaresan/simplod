/**
 * @file Returns different shareable strings for YASGUI
 * @module @@actions/interactions/yasgui.js
 */

import { view } from 'ramda';
import * as YasguiState from '@@app-state/yasgui/state';
import { getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { indentByBrackets } from '@@string';

/**
 * Returns the current YASGUI tab
 * @function
 * @returns {*} Current tab of the YASGUI tool
 */
const tab = () => {
  const tab = view(YasguiState.instance, getState()).getTab();
  tab.setQuery(indentByBrackets(view(YasguiState.query, getState())));

  return tab;
}

/**
 * Returns plain encoded URL to return SPARQL results for the current query in the YASGUI tool
 * @function
 * @returns {string} URL with the encoded query against the current endpoint
 */
export const getDirectFetchUrl = () => tab().yasr.config.getPlainQueryLinkToEndpoint();

/**
 * Returns SPARQL fetch request encoded as a cURL command
 * @function
 * @returns {string} cURL command
 */
export const getCurlFetchString = () => tab().yasqe.getAsCurlString();

/**
 * @function
 * @returns {string} URL that opens the YASGUI tool with the query in place
 */
export const getYasguiShareUrl = () => {
  const endpoint = encodeURIComponent(view(ModelState.endpoint, getState()));
  const query = encodeURIComponent(tab().getQuery());
  return `https://yasgui.triply.cc/?endpoint=${endpoint}&query=${query}`;
};
