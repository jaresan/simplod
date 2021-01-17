import React, {createRef} from 'react';
import { Button, Modal, Tabs, Input } from 'antd';
import FileList from '@@components/controls/file-list';
import { saveViewByUri } from '@@actions/solid';
import { loadGraphFromURL } from '@@actions/model/load-graph';

const {TabPane} = Tabs;

const getTabContents = ({canSave}) => {
  const inputRef = createRef();
  return <Tabs>
    <TabPane tab="Solid pod" key="1">
      <h3>Your files:</h3>
      <FileList canSave={canSave}/>
    </TabPane>
    <TabPane tab="By uri" key="2">
      <Input ref={inputRef} />
      <Button onClick={() => saveViewByUri(inputRef.current.input.value)}>Save</Button>
      <Button onClick={() => loadGraphFromURL({modelURL: inputRef.current.input.value})}>Load</Button>
    </TabPane>
  </Tabs>;
}

export const openFileDialogModal = () => Modal.info({icon: null, maskClosable: true, content: getTabContents({canSave: true})});
