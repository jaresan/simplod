import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  getViewSelection,
  getUser,
  getDirty,
  getEndpoint,
  getFiles
} from '@@selectors';
import {onSolidStart} from '@@actions/solid/lifecycle';
import {logoutSolid, loginToSolid} from '@@actions/solid/auth';

class ControlPanel extends Component {
  state = {
    creatingView: false,
    folderWithNewView: '',
    newViewName: '',
  };

  fileFetchMap = {};

  componentDidMount = async () => {
    onSolidStart();
  };

  onLogin = () => {
    loginToSolid();
  };

  onLogout = () => {
    logoutSolid();
  };

  getLoginData = () => {
    if (this.props.user) {
      return (
        <>
          <span>Logged in as: {this.props.user}</span>
          <br/>
          <Button type="primary" onClick={this.onLogout} title="Logout">Logout</Button>
        </>
      )
    } else {
      return (
        <>
          <Button type="primary" onClick={this.onLogin} title="Login">Login</Button>
        </>
      )
    }
  };

  render() {
    return (
      <div className="login-container">
        { this.getLoginData() }
      </div>
    );
  }
}

const mapStateToProps = appState => ({
  user: getUser(appState),
  isDirty: getDirty(appState),
  view: getViewSelection(appState),
  endpoint: getEndpoint(appState),
  files: getFiles(appState)
});

export default connect(mapStateToProps, null)(ControlPanel);
