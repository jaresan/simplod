import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession, getDirty, getFolderUri } from 'src/selectors/index';
import Actions from 'src/actions';
import './ControlPanel.css';

class ControlPanel extends Component {
  componentDidMount = async () => {
    this.props.onSolidStart();
  };

  onLogin = () => {
    this.props.onSolidLogin();
  };

  onLogout = () => {
    this.props.onSolidLogout();
  };

  onSave = () => {
    const uri = prompt('Please specify the URI where to save the view.');

    if (uri) {
      this.props.onSave(uri);
    }
  };

  onLoad = () => {
    const uri = prompt('Please specify the URI to load.');

    if (uri) {
      this.props.onLoad(uri);
    }
  };

  saveFolderUri = () => {
    this.props.saveFolderUri(this.props.folderUri);
  };

  getLoginData = () => {
    if (this.props.session) {
      return (
        <>
          <span>
            App folder:
            <input value={this.props.folderUri} onChange={e => this.props.setFolderUri(e.target.value)}/>
            <button onClick={this.saveFolderUri}>Submit</button>
          </span>
          <br/>
          <span>Logged in as: {this.props.session.webId}</span>
          <br/>
          <button className="primary-button" onClick={this.onLogout} title="Logout">Logout</button>
        </>
      )
    } else {
      return (
        <>
          <button className="primary-button" onClick={this.onLogin} title="Login">Login</button>
        </>
      )
    }
  };

  getControlPanel = () => (
    <>
      &nbsp;
      <button className="primary-button" onClick={this.onSave} disabled={!this.props.isDirty}>Save view</button>
      &nbsp;
      <button className="primary-button" onClick={this.onLoad}>Load view</button>
    </>
  );

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
  session: getSession(appState),
  isDirty: getDirty(appState),
  folderUri: getFolderUri(appState),
});

const mapDispatchToProps = {
  onSolidLogin: Actions.Creators.s_onSolidLogin,
  onSolidLogout: Actions.Creators.s_onSolidLogout,
  onSolidStart: Actions.Creators.s_onSolidStart,
  onSave: Actions.Creators.s_onViewSave,
  onLoad: Actions.Creators.s_onViewLoad,
  saveFolderUri: Actions.Creators.s_saveFolderUri,
  setFolderUri: Actions.Creators.r_setFolderUri,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
