import React, { Component } from 'react';
import { message, Popconfirm, Button, Input, Tree, Tooltip, Space } from 'antd';
import {CloseOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {curry} from 'ramda';
import path from 'path';
import {
  getDirty,
  getFiles,
  getUser
} from '@@selectors';
import { connect, Provider } from 'react-redux';
import { store } from '@@app-state';
import { deleteFile, loadFiles, loadOwnView, saveOwnView } from '@@actions/solid';

const newViewSuffix = '__newView';

class FileList extends Component {
  state = {
    creatingView: false,
    folderWithNewView: ''
  };

  fileFetchMap = {};

  saveNewView = key => {
    saveOwnView(key);
  };

  onLoadView = (uri) => {
    loadOwnView(uri);
  };

  onDeleteFile = uri => {
    deleteFile(uri);
  };

  getNewFileInput = ({key}) => {
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

  getCreateNewFileIcon = ({key}) => {
    if (!this.props.isDirty) {
      return <Tooltip
        title="No properties selected, newly created file would be empty"
      >
        <PlusOutlined disabled style={{color: 'grey'}}/>
      </Tooltip>
    } else {
      return <PlusOutlined onClick={() => {this.setState({folderWithNewView: key})}} style={{color: 'blue'}}/>;
    }
  };

  getFileWithControls = ({title, key}) => {
    return (
      <span>
        {title}
        <Popconfirm
          title="Are you sure you want to apply this view?"
          onConfirm={() => this.onLoadView(key)}
          okText="Apply"
          cancelText="Cancel"
        >
          <UploadOutlined />
        </Popconfirm>
        <Space />
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
  };

  renderTreeNode = ({title, isLeaf, key, isNewFileInput, isNewFilePrompt}) => {
    key = key.replace(newViewSuffix, '');
    if (isNewFileInput) {
      return this.getNewFileInput({key});
    }

    if (isNewFilePrompt) {
      return this.getCreateNewFileIcon({key});
    }

    if (!isLeaf) {
      return <span>{title}</span>;
    }

    return this.getFileWithControls({title, key});
  }

  loadTreeNodeData = ({ key, children }) => {
    return new Promise(resolve => {
      if (children) {
        resolve();
        return;
      }

      loadFiles(key);

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
    const {__loaded, ...rest} = (content || {});
    if (resolve && __loaded) {
      resolve();
      clearTimeout(timeout);
      delete this.fileFetchMap[key];
    }
    let children = null;
    const isLeaf = content === null;
    const folderInitialized = !isLeaf && __loaded;
    if (folderInitialized) {
      const isNewFileInput = key === this.state.folderWithNewView && this.props.isDirty;

      children = Object.entries(rest).map(this.getFileSubtree(key));
      children.push({isNewFilePrompt: !isNewFileInput, isNewFileInput, key: `${key}${newViewSuffix}`, isLeaf: true});
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

  render() {
    if (!this.props.files || !this.props.user) return null;

    const treeData = this.getFileTreeData();
    return <Tree.DirectoryTree
      showLine={{showLeafIcon: false}}
      selectable={false}
      titleRender={this.renderTreeNode}
      loadData={this.loadTreeNodeData}
      defaultExpandedKeys={['/']}
      treeData={treeData}
    />
  }
}


// FIXME: @dispatch @store remove hacky connection and use @@app-state connect
const mapStateToProps = appState => ({
  isDirty: getDirty(appState),
  user: getUser(appState),
  files: getFiles(appState)
});

// Connect component to enable use in modal content
const Connected = connect(mapStateToProps, null)(FileList);

export default props => <Provider store={store}><Connected {...props}/></Provider>;
