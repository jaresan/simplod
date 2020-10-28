import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from 'src/actions/solid';
import { message, Button } from 'antd';
import {
  getViewSelection,
  getUser,
  getDirty,
  getFolderUri,
  getFolderUriChanging,
  getEndpoint,
  getFiles, getSimpleQuery
} from '../selectors';
import FileList from './fileList/FileList';

class ControlPanel extends Component {
  state = {
    creatingView: false,
    folderWithNewView: '',
    newViewName: '',
  };

  fileFetchMap = {};

  componentDidMount = async () => {
    this.props.onSolidStart();
  };

  onLogin = () => {
    this.props.onSolidLogin();
  };

  onLogout = () => {
    this.props.onSolidLogout();
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


  onSaveNewView = () => {
    const uri = this.props.folderUri.replace(/\/?$/, `/${this.state.newViewName}`);
    this.onSaveView(uri);
    this.setState({
      creatingView: false,
    })
  };

  onSaveView = (uri) => {
    if (!this.props.user) {
      return this.downloadView();
    }

    if (!uri) {
      uri = prompt('Please specify the URI where to save the view.');
    }


    if (uri) {
      this.props.onSave(uri);
    }
  };

  saveFolderUri = () => {
    if (!this.props.folderUri.match(/^https?:\/\//)) {
      message.error('Folder uri has to be an absolute URL.');
    } else {
      this.props.saveFolderUri(this.props.folderUri);
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
        {
          this.props.user ? "Save view at URI" : "Download view"
        }
      </Button>
      &nbsp;
      <Button type="primary" onClick={() => this.onLoadView()}>Load view by URI</Button>
    </>
  );

  saveNewView = key => {
    this.props.saveOwnView(key);
  };

  render() {
    const {isDirty, user, files, loadOwnView, deleteFile, loadFiles, saveOwnView} = this.props;
    return (
      <div className="login-container">
        { this.getLoginData() }
        { this.getControlPanel() }
        <FileList
          canSave={isDirty}
          user={user}
          files={files}
          loadOwnView={loadOwnView}
          deleteFile={deleteFile}
          loadFiles={loadFiles}
          saveOwnView={saveOwnView}
        />
        <Button onClick={() => {
          window.navigator.clipboard.writeText(this.props.simpleQuery);
          message.success('Query URL copied to clipboard');
        }}>Copy request URL to clipboard</Button>
      </div>
    );
  }
}

const mapStateToProps = appState => ({
  user: getUser(appState),
  isDirty: getDirty(appState),
  folderUri: getFolderUri(appState, true),
  view: getViewSelection(appState),
  folderUriChanging: getFolderUriChanging(appState),
  endpoint: getEndpoint(appState),
  files: getFiles(appState),
  simpleQuery: getSimpleQuery(appState)
});

const mapDispatchToProps = {
  onSolidLogin: Actions.Creators.s_onSolidLogin,
  onSolidLogout: Actions.Creators.s_onSolidLogout,
  onSolidStart: Actions.Creators.s_onSolidStart,
  onSave: Actions.Creators.s_onViewSave,
  loadOwnView: Actions.Creators.s_loadOwnView,
  saveFolderUri: Actions.Creators.s_saveFolderUri,
  setFolderUri: Actions.Creators.r_setFolderUri,
  toggleFolderUriChanging: Actions.Creators.r_toggleFolderUriChanging,
  deleteFile: Actions.Creators.s_deleteFile,
  loadFiles: Actions.Creators.s_loadFiles,
  saveOwnView: Actions.Creators.s_saveOwnView
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
