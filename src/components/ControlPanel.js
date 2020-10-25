import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from 'src/actions/solid';
import { message, Popconfirm, Button, Input, Tree, Tooltip } from 'antd';
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {curry} from 'ramda';
import path from 'path';
import {
  getViewSelection,
  getUser,
  getDirty,
  getFolderUri,
  getFolderUriChanging,
  getEndpoint,
  getFiles, getSimpleQuery
} from '../selectors';

const newViewSuffix = '__newView';

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

  onDeleteFile = uri => {
    this.props.deleteFile(uri);
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

  renderTreeNode = ({title, isLeaf, key, isNewViewInput, isPlusIcon}) => {
    key = key.replace(newViewSuffix, '');
    if (isNewViewInput) {
      const ref = React.createRef();
      const onSave = () => {
        this.saveNewView(path.join(key, ref.current.input.value));
        ref.current.setValue('');
        this.setState({folderWithNewView: ''});
      }
      return <>
        <Input
          autoFocus
          ref={ref}
          style={{width: 128}}
          name="View name"
          autoComplete="off"
          type="text"
          onPressEnter={onSave}
          placeholder="New view name"
        />
        <Button onClick={onSave}>Save</Button>
      </>
    }

    if (isPlusIcon) {
      if (!this.props.isDirty) {
        return <Tooltip
          title="No properties selected, newly created file would be empty"
        >
          <PlusOutlined disabled style={{color: 'grey'}}/>
        </Tooltip>
      } else {
        return <PlusOutlined disabled onClick={() => {this.setState({folderWithNewView: key})}} style={{color: 'blue'}}/>;
      }
    }

    if (!isLeaf) {
      return <span>{title}</span>;
    }

    return (
      <span>
        <Popconfirm
          title="Are you sure you want to apply this view?"
          onConfirm={() => this.onLoadView(key)}
          okText="Apply"
          cancelText="Cancel"
        >
          {title}
        </Popconfirm>
        <Popconfirm
          title="Are you sure you want to delete this view?"
          onConfirm={() => this.onDeleteFile(key)}
          okText="Delete"
          cancelText="Cancel"
        >
          <CloseOutlined/>
        </Popconfirm>
      </span>
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
      const isNewViewInput = key === this.state.folderWithNewView && this.props.isDirty;
      children.push({isPlusIcon: !isNewViewInput, isNewViewInput, key: `${key}${newViewSuffix}`, isLeaf: true});
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
    if (!this.props.files || !this.props.user) return;

    const treeData = this.getFileTreeData();
    return (
      <>
        <h3>Your files:</h3>
        <Tree.DirectoryTree
          showLine={{showLeafIcon: false}}
          selectable={false}
          titleRender={this.renderTreeNode}
          loadData={this.loadTreeNodeData}
          defaultExpandedKeys={['/']}
          onSelect={this.onSelect}
          treeData={treeData}
        />
      </>
    )
  }

  render() {
    return (
      <div className="login-container">
        { this.getLoginData() }
        { this.getControlPanel() }
        { this.getFolders() }
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
