import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession, getDirty } from 'src/selectors/index';
import Actions from 'src/actions';
import auth from 'solid-auth-client';
import './ControlPanel.css';

class ControlPanel extends Component {
  componentDidMount = async () => {
    window.auth = auth;
    const session = await auth.currentSession();
    if (session) {
      this.props.solidLoggedIn(session);
    }
  };

  onLogin = async () => {
    let session = await auth.currentSession();
    let popupUri = 'https://solid.community/common/popup.html';
    if (!session) {
      session = await auth.popupLogin({ popupUri });
    }
    this.props.solidLoggedIn(session);
  };

  onLogout = async () => {
    await auth.logout();
    this.props.solidLoggedOut();
  };

  onSave = () => {
    const uri = prompt('Please specify the URI where to save the view.');

    console.log(uri);
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

  getLoginData = () => {
    if (this.props.session) {
      return (
        <>
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
});

const mapDispatchToProps = {
  solidLoggedIn: Actions.Creators.r_solidLoggedIn,
  solidLoggedOut: Actions.Creators.r_solidLoggedOut,
  onSave: Actions.Creators.s_onViewSave,
  onLoad: Actions.Creators.s_onViewLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
