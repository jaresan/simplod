import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from 'src/actions/solid';
import styled from '@emotion/styled';
import {message} from 'antd';
import { getViewSelection, getSession, getDirty, getFolderUri, getFolderUriChanging, getViews } from '../selectors';

const PrimaryButton = styled.button`
  background: ${({disabled}) => disabled ? '#9d9d9d' : '#337ab7'};
  border-color: #2e6da4;
  border-radius: 4px;
  padding: 12px;
  font-size: 12px;
  color: white;
  outline: none;
`;

const FolderUriInput = styled.input`
  border: 1px solid black;
  background: ${({disabled, invalid}) => (disabled && 'lightgrey') || (invalid && '#ff6464')};
`;

class ControlPanel extends Component {
  state = {
    creatingView: false,
    newViewName: '',
  };

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

  onDeleteView = uri => {
    if (window.confirm(`Are you sure you want to delete view at ${uri}?`)) {
      this.props.deleteView(uri);
    }
  };

  getNewViewInput = () => {
    if (this.state.creatingView) {
      return (
        <li>
          <span>
            <input
              onChange={e =>
                this.setState({
                  newViewName: e.target.value
                })
              }
            />
            <button onClick={this.onSaveNewView}>Save</button>
          </span>
        </li>
      )
    } else if (this.props.isDirty) {
      return (
        <li>
          <button
            onClick={() => this.setState({
              creatingView: true,
            })}
          >
            New view
          </button>
        </li>
      )
    }
  };

  getViewList = () => {
    if (!this.props.session) {
      return;
    }

    return (
      <ul>
        {
          this.props.views.map(v =>
            <li key={v}>
              { v.replace(/.*\//, '') }
              <button onClick={() => this.onLoadView(v)}>Load</button>
              <button onClick={() => this.onDeleteView(v)}>X</button>
            </li>
          )
        }
        { this.getNewViewInput() }
      </ul>
    )
  };

  onSaveView = (uri) => {
    if (!this.props.session) {
      return this.downloadView();
    }

    if (!uri) {
      uri = prompt('Please specify the URI where to save the view.');
    }


    if (uri) {
      this.props.onSave(uri);
    }
  };

  onLoadView = (uri) => {
    if (!uri) {
      uri = prompt('Please specify the URI to load.');
    }

    if (uri) {
      this.props.onLoadView(uri);
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
    if (this.props.session) {
      return (
        <>
          <span>
            App folder:
            <FolderUriInput
              required
              disabled={!this.props.folderUriChanging}
              ref={e => this.folderUriInput = e}
              value={this.props.folderUri}
              onChange={e => this.props.setFolderUri(e.target.value)}
            />
            {
              this.props.folderUriChanging ?
                <button onClick={this.saveFolderUri}>Submit</button>
                :
                <button onClick={() => this.props.toggleFolderUriChanging(true)}>Change</button>
            }
          </span>
          <br/>
          <span>
            Your saved views: {this.getViewList()}
          </span>
          <br/>
          <span>Logged in as: {this.props.session.webId}</span>
          <br/>
          <PrimaryButton onClick={this.onLogout} title="Logout">Logout</PrimaryButton>
        </>
      )
    } else {
      return (
        <>
          <PrimaryButton onClick={this.onLogin} title="Login">Login</PrimaryButton>
        </>
      )
    }
  };

  getControlPanel = () => (
    <>
      &nbsp;
      <PrimaryButton
        onClick={() => this.onSaveView()}
        disabled={!this.props.isDirty}
      >
        {
          this.props.session ? "Save view at URI" : "Download view"
        }
      </PrimaryButton>
      &nbsp;
      <PrimaryButton onClick={() => this.onLoadView()}>Load view by URI</PrimaryButton>
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
  folderUri: getFolderUri(appState, true),
  view: getViewSelection(appState),
  folderUriChanging: getFolderUriChanging(appState),
  views: getViews(appState),
});

const mapDispatchToProps = {
  onSolidLogin: Actions.Creators.s_onSolidLogin,
  onSolidLogout: Actions.Creators.s_onSolidLogout,
  onSolidStart: Actions.Creators.s_onSolidStart,
  onSave: Actions.Creators.s_onViewSave,
  onLoadView: Actions.Creators.s_onViewLoad,
  saveFolderUri: Actions.Creators.s_saveFolderUri,
  setFolderUri: Actions.Creators.r_setFolderUri,
  toggleFolderUriChanging: Actions.Creators.r_toggleFolderUriChanging,
  deleteView: Actions.Creators.s_deleteView,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
