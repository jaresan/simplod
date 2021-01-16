import {message} from 'antd';

export const withLoading = msg => {
  const hideMsg = message.loading(msg);

  return val => {
    hideMsg();
    return val;
  }
};

export const withLoadingP = msg => {
  const hideMsg = message.loading(msg);

  return promise => promise.finally(hideMsg);
};
