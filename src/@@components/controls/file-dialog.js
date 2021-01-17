import React, {createRef, useState} from 'react';
import { Space, Button, Modal, Tabs, Input, Select, Typography } from 'antd';
import FileList from '@@components/controls/file-list';
import { saveViewByUri } from '@@actions/solid';
import { loadGraphFromURL } from '@@actions/model/load-graph';
import { loginToSolid } from '@@actions/solid/auth';
import { getUser } from '@@selectors';
import { getState } from '@@app-state';

const {TabPane} = Tabs;
const {Option} = Select;

const TabContents = ({canSave, canLoad}) => {
  const inputRef = createRef();
  const [permissions, setPermissions] = useState('private');
  const [loggedIn, setLoggedIn] = useState(getUser(getState()))
  return <Space direction="vertical">
    <Tabs>
      <TabPane tab="Solid pod" key="1">
        {
          loggedIn ? <>
            <h3>Your files:</h3>
            <FileList permissions={permissions} canSave={canSave} canLoad={canLoad}/>
          </>
            :
          <Button type="primary" onClick={() => loginToSolid().then(() => setLoggedIn(true))}>
            Login to see your Solid Pod files
          </Button>
        }
      </TabPane>
      <TabPane tab="By uri" key="2">
        <Space direction="horizontal">
          <Input ref={inputRef} />
          {
            canSave && <Button onClick={() => saveViewByUri(inputRef.current.input.value, permissions)}>Save</Button>
          }
          {
            canLoad && <Button onClick={() => loadGraphFromURL({modelURL: inputRef.current.input.value})}>Load</Button>
          }
        </Space>
      </TabPane>
    </Tabs>
    {
      canSave && <Space direction="horizontal">
        <Typography.Text>Saved file permissions:</Typography.Text>
        <Select value={permissions} onChange={setPermissions} defaultValue="private" style={{ width: 120 }}>
          <Option value="private">Private</Option>
          <Option value="public/read">Public/Read</Option>
          <Option value="public/write">Public/Write</Option>
        </Select>
      </Space>
    }
  </Space>
}

export const openFileDialogModal = ({canSave = true, canLoad = true}) => Modal.info({icon: null, maskClosable: true, content: <TabContents canSave={canSave} canLoad={canLoad} /> });
export const openSaveDialogModal = () => openFileDialogModal({canSave: true, canLoad: false});
export const openLoadDialogModal = () => openFileDialogModal({canSave: false, canLoad: true});
