import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from 'src/actions/solid';
import {message, Popconfirm, Button, Input, Tree} from 'antd';
import {curry} from 'ramda';
import path from 'path';
import {
  getViewSelection,
  getSession,
  getDirty,
  getFolderUri,
  getFolderUriChanging,
  getViews,
  getQuery, getEndpoint,
  getFiles
} from '../selectors';

const newViewSuffix = '__newView';

class ControlPanel extends Component {
  state = {
    creatingView: false,
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

  onDeleteView = uri => {
    this.props.deleteView(uri);
  };

  getNewViewInput = () => {
    if (this.state.creatingView) {
      return (
        <li>
          <span>
            <Input
              onChange={e =>
                this.setState({
                  newViewName: e.target.value
                })
              }
            />
            <Button onClick={this.onSaveNewView}>Save</Button>
          </span>
        </li>
      )
    } else if (this.props.isDirty) {
      return (
        <li>
          <Button
            onClick={() => this.setState({
              creatingView: true,
            })}
          >
            New view
          </Button>
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
              <Button onClick={() => this.onLoadView(v)}>Load</Button>
              <Popconfirm
                title="Are you sure you want to delete this view?"
                onConfirm={() => this.onDeleteView(v)}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button>X</Button>
              </Popconfirm>
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
    this.props.loadOwnView(uri);
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
            <Input
              required
              disabled={!this.props.folderUriChanging}
              ref={e => this.folderUriInput = e}
              value={this.props.folderUri}
              onChange={e => this.props.setFolderUri(e.target.value)}
            />
            {
              this.props.folderUriChanging ?
                <Button onClick={this.saveFolderUri}>Submit</Button>
                :
                <Button onClick={() => this.props.toggleFolderUriChanging(true)}>Change</Button>
            }
          </span>
          <br/>
          <span>
            Your saved views: {this.getViewList()}
          </span>
          <br/>
          <span>Logged in as: {this.props.session.webId}</span>
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
          this.props.session ? "Save view at URI" : "Download view"
        }
      </Button>
      &nbsp;
      <Button type="primary" onClick={() => this.onLoadView()}>Load view by URI</Button>
    </>
  );

  saveNewView = key => {
    this.props.saveOwnView(key);
  };

  renderTreeNode = ({title, isLeaf, key, isNewViewInput}) => {
    if (isNewViewInput) {
      const ref = React.createRef();
      key = key.replace(newViewSuffix, '');
      return <>
        <Input
          ref={ref}
          style={{width: 128}}
          name="View name"
          autoComplete="off"
          type="text"
          onPressEnter={({target: {value}}) => {
            this.saveNewView(path.join(key, value));
            ref.current.setValue('');
          }}
          placeholder="New view name"
        />
        <Button onClick={() => {
          this.saveNewView(path.join(key, ref.current.input.value));
          ref.current.setValue('');
        }}>Save</Button>
      </>
    }
    if (!isLeaf) {
      return <span>{title}</span>;
    }

    return (
      <Popconfirm
        title="Are you sure you want to apply this view?"
        onConfirm={() => this.onLoadView(key)}
        okText="Apply"
        cancelText="Cancel"
      >
        <span>{title}</span>
      </Popconfirm>
    );
  }

  loadTreeNodeData = ({ key, children }) => {
    return new Promise(resolve => {
      if (children) {
        resolve();
        return;
      }

      this.props.loadFiles(key);

      this.fileFetchMap[key] = {
        resolve,
        timeout: setTimeout(() => {
          message.error('There was a problem fetching files from the folder.');
          resolve();
        }, 10000)
      }
    });
  };

  getFileSubtree = curry((curr, [title, content]) => {
    const key = path.join(curr, title);
    const {timeout, resolve} = (this.fileFetchMap[key] || {});
    if (resolve) {
      resolve();
      clearTimeout(timeout);
      delete this.fileFetchMap[key];
    }

    const isLeaf = content === null;
    const {__loaded, ...rest} = (content || {});
    const folderInitialized = !isLeaf && __loaded;
    const children = folderInitialized ? Object.entries(rest).map(this.getFileSubtree(key)) : null;
    if (folderInitialized) {
      children.push({isNewViewInput: true, key: `${key}${newViewSuffix}`, isLeaf: true});
    }
    return {
      title,
      key,
      children,
      isLeaf
    };
  });

  getFileTreeData() {
    const {files} = this.props;
    return Object.entries(files).map(this.getFileSubtree(''));
  }

  getFolders() {
    if (!this.props.files) return;

    const treeData = this.getFileTreeData();
    return (
      <Tree.DirectoryTree
        selectable={false}
        titleRender={this.renderTreeNode}
        loadData={this.loadTreeNodeData}
        defaultExpandedKeys={['/']}
        onSelect={this.onSelect}
        treeData={treeData}
      />
    )
  }

  render() {
    const {query} = this.props;
    return (
      <div className="login-container">
        { this.getLoginData() }
        { this.getControlPanel() }
        { this.getFolders() }
        <Button onClick={() => {
          window.navigator.clipboard.writeText(`${this.props.endpoint}?query=${encodeURIComponent(query)}`);
          message.success('Query URL copied to clipboard');
        }}>Copy request URL to clipboard</Button>
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
  query: getQuery(appState),
  endpoint: getEndpoint(appState),
  files: getFiles(appState)
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
  deleteView: Actions.Creators.s_deleteView,
  loadFiles: Actions.Creators.s_loadFiles,
  saveOwnView: Actions.Creators.s_saveOwnView
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
