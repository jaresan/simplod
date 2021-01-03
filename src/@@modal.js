import {fromPairs} from 'ramda';
import {Modal, notification} from 'antd';

const emptyFn = () => {};

const openModal = (type, {
  loadingMsg,
  successMsg,
  errorMsg,
  onSuccess = emptyFn,
  onError = emptyFn,
  onCancel = emptyFn,
  onFinish = emptyFn,
  onOk = emptyFn,
  waitForFinish,  // Whether the modal should be dismissed only after the completion of onOk callback
  className,
  ...rest
}) =>
  new Promise((res, err) => {
    Modal[type]({
      maskClosable: true,
      ...rest,
      onOk() {
        const routinePromise = (async () => {
          const loadingNotificationKey = `${Math.random()}`;
          if (loadingMsg) {
            notification.info({key: loadingNotificationKey, message: loadingMsg, duration: 0});
          }

          try {
            // The yielded result for coroutine has to be a promise --> wrap with Promise.resolve
            const onOkResult = await Promise.resolve(onOk());
            notification.close(loadingNotificationKey);
            if (successMsg) {
              notification.success({message: successMsg});
            }
            onSuccess(onOkResult);
            res({result: onOkResult});
          } catch (e) {
            notification.close(loadingNotificationKey);
            if (errorMsg) {
              notification.error({message: errorMsg});
            }
            onError(e);
            err(e);
          } finally {
            onFinish();
          }
        })();

        if (waitForFinish) {
          // returning a promise makes the modal wait for the promise's completion and display a loader
          return routinePromise;
        }

        return null;
      },
      onCancel() {
        onCancel();
        res({cancelled: true});
      }
    });
  });

const AsyncModal = fromPairs(['info', 'warning', 'error', 'confirm'].map(type => [type, params => openModal(type, params)]));
const destroy = Modal.destroyAll;

export {AsyncModal, destroy};
