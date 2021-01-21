import React from 'react';
import { Progress } from 'antd';
import { connect, Provider } from 'react-redux';
import { getLoadingHumanReadable } from '@@selectors';
import { store } from '@@app-state';

const Loading = ({loadingHumanReadable}) => (
  <>
    Downloading human readable labels:
    <Progress style={{width: 256}} percent={loadingHumanReadable} status={loadingHumanReadable < 100 && "active"} />
  </>
);


const mapStateToProps = appState => ({
  loadingHumanReadable: getLoadingHumanReadable(appState)
});

// Connect component to enable use in modal content
const Connected = connect(mapStateToProps, null)(Loading);

export default props => <Provider store={store}><Connected {...props}/></Provider>;
