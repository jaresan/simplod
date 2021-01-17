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
import {onViewSave, saveOwnView} from '@@actions/solid';
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

  downloadView = () => {
    const name = prompt('Specify the filename.');
    if (!name) return;

    const view = this.props.view;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(view));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", name + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  onSaveView = (uri) => {
    if (!this.props.user) {
      return this.downloadView();
    }

    if (!uri) {
      uri = prompt('Please specify the URI where to save the view.');
    }


    if (uri) {
      onViewSave(uri);
    }
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

  getControlPanel = () => (
    <>
      &nbsp;
      <Button
        type="primary"
        onClick={() => this.onSaveView()}
        disabled={!this.props.isDirty}
      >
        { this.props.user ? "Save view at URI" : "Download view" }
      </Button>
      &nbsp;
      <Button type="primary" onClick={() => this.onLoadView()}>Load view by URI</Button>
    </>
  );

  saveNewView = key => {
    saveOwnView(key);
  };

  render() {
    return (
      <div className="login-container">
        { this.getLoginData() }
        { this.getControlPanel() }
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
