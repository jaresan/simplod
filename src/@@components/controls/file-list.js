import React, { Component } from 'react';
import { message, Button, Input, Tree, Space, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { curry } from 'ramda';
import path from 'path';
import {
  getFiles, getSessionValid,
  getUser
} from '@@selectors';
import { connect, Provider } from 'react-redux';
import { store } from '@@app-state';
import {loadFiles, saveViewByUri, getFileUrl} from '@@actions/solid';
import {deleteFile} from '@@actions/solid/files';
import { loadGraphFromURL } from '@@actions/model/load-graph';

const newViewSuffix = '__newView'; // Used to add a key to the rendered empty node in the same folder so that it doesn't clash with the folder's key itself

class FileList extends Component {
  state = {
    creatingView: false,
    folderWithNewView: ''
  };

  fileFetchMap = {};

  saveNewView = async key => saveViewByUri(await getFileUrl(key), this.props.permissions);

  onLoadView = async uri => loadGraphFromURL({modelURL: await getFileUrl(uri)});

  onDeleteFile = uri => deleteFile(uri);

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
    if (this.props.canSave) {
      return <PlusOutlined onClick={() => {this.setState({folderWithNewView: key})}} style={{color: 'blue'}}/>;
    }
  };

  getFileWithControls = ({title, key}) => {
    return (
      <Space size={4}>
        <Popover
          onConfirm={() => this.saveNewView(key)}
          okText="Save"
          trigger="click"
          cancelText="Cancel"
          content={<Space direction="horizontal">
            {this.props.canSave && <Button danger onClick={() => this.saveNewView(key)}>Overwrite</Button>}
            {this.props.canLoad && <Button onClick={() => this.onLoadView(key)}>Load</Button>}
            <Button danger onClick={() => this.onDeleteFile(key)}>Delete</Button>
          </Space>}
        >
          {title}
        </Popover>
      </Space>
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
      const isNewFileInput = key === this.state.folderWithNewView && this.props.canSave;

      children = Object.entries(rest).map(this.getFileSubtree(key));
      if (this.props.canSave) {
        children.push({isNewFilePrompt: !isNewFileInput, isNewFileInput, key: `${key}${newViewSuffix}`, isLeaf: true});
      }
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
    return <Tree.DirectoryTree
      showLine={{showLeafIcon: false}}
      selectable={false}
      titleRender={this.renderTreeNode}
      loadData={this.loadTreeNodeData}
      defaultExpandedKeys={['/']}
      treeData={this.getFileTreeData()}
    />
  }
}


// FIXME: @dispatch @store remove hacky connection and use @@app-state connect
const mapStateToProps = appState => ({
  user: getUser(appState),
  files: getFiles(appState),
  sessionValid: getSessionValid(appState)
});

// Connect component to enable use in modal content
const Connected = connect(mapStateToProps, null)(FileList);

export default props => <Provider store={store}><Connected {...props}/></Provider>;
