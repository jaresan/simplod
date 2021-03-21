import React from 'react';
import { Button, Space } from 'antd';

export class WithRetry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: props.retryTime,
      failed: 0
    }
  }

  componentDidMount() {
    const {retryFn, onSuccess} = this.props;

    retryFn()
      .then(onSuccess)
      .catch(() => {
        this.initializeInterval()
        this.setState({
          failed: 1
        });
      })
  }

  initializeInterval() {
    const {retryFn, retryTime, maxRetries, onSuccess, onFail} = this.props;

    let retries = 0;
    this.interval = setInterval(() => {
      const {timeLeft, failed} = this.state;

      const left = timeLeft - 1000;
      if (left <= 0) {
        this.toggleRetrying(true);
        retries++;
        const [failCb, clearCb] = retries >= maxRetries ? [onFail, () => clearInterval(this.interval)] : [() => {}, () => {}];
        retryFn()
          .then(() => {
            onSuccess();
            clearInterval(this.interval);
          })
          .catch(failCb)
          .finally(() => {
            clearCb();
            this.toggleRetrying(false);
          })

        this.setState({
          timeLeft: retryTime,
          failed: failed + 1
        });
      } else {
        this.setState({
          timeLeft: left
        });
      }
    }, 1000);
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  toggleRetrying = retryInProgress => this.setState({
    retryInProgress
  });

  onClickRetry = async () => {
    this.toggleRetrying(true);
    const {retryFn, onSuccess} = this.props;

    retryFn().then(() => {
      this.clearInterval();
      onSuccess();
    }).finally(() => this.toggleRetrying(false));
  }

  onClickCancel = () => {
    const {onCancel} = this.props;
    this.clearInterval();
    onCancel();
  }

  render() {
    const {children, containerProps, maxRetries} = this.props;
    const {failed, retryInProgress} = this.state;

    return !!failed && <div {...containerProps}>
      <Space direction="vertical">
        {children}
        <span>Tries left: {maxRetries - failed}</span>
        <Space>
          <Button loading={retryInProgress} onClick={this.onClickRetry}>Retrying in {Math.round(this.state.timeLeft / 1000)}s</Button>
          <Button onClick={this.onClickCancel}>Cancel</Button>
        </Space>
      </Space>
    </div>;
  }
}
