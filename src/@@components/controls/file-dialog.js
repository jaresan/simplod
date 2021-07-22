/**
 * @file File dialog allowing the users to save and load files
 * @module @@components/controls/file-dialog
 */
import React, {createRef, useState} from 'react';
import { Space, Button, Modal, Tabs, Input, Upload } from 'antd';
import FileList from '@@components/controls/file-list';
import { saveViewByUri } from '@@actions/solid/files';
import { loadGraphFromURL } from '@@actions/load';
import { loginToSolid } from '@@actions/solid/auth';
import {
  getFilename,
  getLastSave,
  getUser
} from '@@selectors';
import { getState, store } from '@@app-state';
import { downloadData, saveDataLocally } from '@@actions/save';
import { loadLocalData, loadModel } from '@@actions/load';
import { path, pipe } from 'ramda';
import { connect, Provider } from 'react-redux';
import { getLastLocalState } from '@@storage';
import { DesktopOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { openFileOptionsInfoModal } from '@@components/controls/modal-info-edit-file';
import { translated } from '@@localization';

const {TabPane} = Tabs;

const loadUploadedFile = file => {
  const reader = new FileReader();

  reader.onload = pipe(path(['target', 'result']), JSON.parse, loadModel);
  reader.readAsText(file);

  // Prevent upload
  return false;
};

const TabContents = ({canSave, canLoad, lastLocalSave, localFilename}) => {
  const inputRef = createRef();
  const [loggedIn, setLoggedIn] = useState(getUser(getState()))
  return <Space direction="vertical">
    {canSave && <Button onClick={downloadData}>{translated('Download file')}<DownloadOutlined/></Button>}
    {canLoad && <Upload
      accept=".json"
      beforeUpload={f => {
        Modal.destroyAll();
        return loadUploadedFile(f);
      }}>
        <Button>{translated('Upload file')}<UploadOutlined/></Button>
      </Upload>
    }
    {canSave && <Button onClick={saveDataLocally}>{translated('Save to browser storage')}<DesktopOutlined/></Button>}
    {canLoad && <Button onClick={loadLocalData}>{translated('Load from browser storage')}<DesktopOutlined/></Button>}
    {((canSave || canLoad) && lastLocalSave) ? <div>{translated('Last file:')} {localFilename} @{new Date(lastLocalSave).toLocaleString()}}</div> : null}
    <Tabs>
      <TabPane tab="Solid pod" key="1">
        {
          loggedIn ? <>
            <h3>{translated('Your files:')}</h3>
            <FileList canSave={canSave} canLoad={canLoad}/>
          </>
            :
          <Button type="primary" onClick={() => loginToSolid().then(() => setLoggedIn(true))}>
            {translated('Login to see your Solid Pod files')}
          </Button>
        }
      </TabPane>
      <TabPane tab="By URI" key="2">
        <Space direction="horizontal">
          <Input ref={inputRef} />
          {
            canSave && <Button danger onClick={() => saveViewByUri(inputRef.current.input.value)}>{translated('Save')}</Button>
          }
          {
            canLoad && <Button onClick={() => loadGraphFromURL({modelURL: inputRef.current.input.value})
              .then(({modelURL, hasPermissions}) => {
                Modal.destroyAll();
                openFileOptionsInfoModal({modelURL, hasPermissions})
              })}>{translated('Load')}</Button>
          }
        </Space>
      </TabPane>
    </Tabs>
  </Space>
}

const mapStateToProps = appState => ({
  lastLocalSave: getLastSave(appState),
  localFilename: getFilename(getLastLocalState()),
});
// Connect component to enable use in modal content
const Connected = connect(mapStateToProps, null)(TabContents);

const ModalContent = props => <Provider store={store}><Connected {...props}/></Provider>;

export const openFileDialogModal = ({canSave = true, canLoad = true, lastLocalSave, localFilename}) => {
  Modal.destroyAll();
  Modal.info({icon: null, maskClosable: true, content: <ModalContent canSave={canSave} canLoad={canLoad} lastLocalSave={lastLocalSave} localFilename={localFilename} /> });
}

export const openSaveDialogModal = props => openFileDialogModal({canSave: true, canLoad: false, ...props});
export const openLoadDialogModal = props => openFileDialogModal({canSave: false, canLoad: true,...props});
