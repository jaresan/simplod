import { view } from 'ramda';
import * as YasguiState from '@@app-state/yasgui/state';
import { getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';

export const getDirectFetchUrl = () => {
  const yasguiInstance = view(YasguiState.instance, getState());
  return yasguiInstance.getTab().yasr.config.getPlainQueryLinkToEndpoint();
};

export const getCurlFetchString = () => {
  const yasguiInstance = view(YasguiState.instance, getState());
  return yasguiInstance.getTab().yasqe.getAsCurlString();
};

export const getYasguiShareUrl = () => {
  const endpoint = encodeURIComponent(view(ModelState.endpoint, getState()));
  const yasguiInstance = view(YasguiState.instance, getState());
  const query = encodeURIComponent(yasguiInstance.getTab().getQuery());
  return `https://yasgui.triply.cc/?endpoint=${endpoint}&query=${query}`;
};
