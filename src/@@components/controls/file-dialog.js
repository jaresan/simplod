import React, {createRef, useState} from 'react';
import { Space, Button, Modal, Tabs, Input } from 'antd';
import FileList from '@@components/controls/file-list';
import { saveViewByUri } from '@@actions/solid';
import { loadGraphFromURL } from '@@actions/model/load-graph';
import { loginToSolid } from '@@actions/solid/auth';
import { getUser } from '@@selectors';
import { getState } from '@@app-state';

const {TabPane} = Tabs;

const TabContents = ({canSave, canLoad}) => {
  const inputRef = createRef();
  const [loggedIn, setLoggedIn] = useState(getUser(getState()))
  return <Space direction="vertical">
    <Tabs>
      <TabPane tab="Solid pod" key="1">
        {
          loggedIn ? <>
            <h3>Your files:</h3>
            <FileList canSave={canSave} canLoad={canLoad}/>
          </>
            :
          <Button type="primary" onClick={() => loginToSolid().then(() => setLoggedIn(true))}>
            Login to see your Solid Pod files
          </Button>
        }
      </TabPane>
      <TabPane tab="By URI" key="2">
        <Space direction="horizontal">
          <Input ref={inputRef} />
          {
            canSave && <Button danger onClick={() => saveViewByUri(inputRef.current.input.value)}>Overwrite</Button>
          }
          {
            canLoad && <Button onClick={() => loadGraphFromURL({modelURL: inputRef.current.input.value})}>Load</Button>
          }
        </Space>
      </TabPane>
    </Tabs>
  </Space>
}

export const openFileDialogModal = ({canSave = true, canLoad = true}) => {
  Modal.destroyAll();
  Modal.info({icon: null, maskClosable: true, content: <TabContents canSave={canSave} canLoad={canLoad} /> });
}
export const openSaveDialogModal = () => openFileDialogModal({canSave: true, canLoad: false});
export const openLoadDialogModal = () => openFileDialogModal({canSave: false, canLoad: true});
