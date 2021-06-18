import { view } from 'ramda';
import * as YasguiState from '@@app-state/yasgui/state';
import { getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import { indentByBrackets } from '@@string';

const tab = () => {
  const tab = view(YasguiState.instance, getState()).getTab();
  tab.setQuery(indentByBrackets(view(YasguiState.query, getState())));

  return tab;
}

export const getDirectFetchUrl = () => tab().yasr.config.getPlainQueryLinkToEndpoint();

export const getCurlFetchString = () => tab().yasqe.getAsCurlString();

export const getYasguiShareUrl = () => {
  const endpoint = encodeURIComponent(view(ModelState.endpoint, getState()));
  const query = encodeURIComponent(tab().getQuery());
  return `https://yasgui.triply.cc/?endpoint=${endpoint}&query=${query}`;
};
