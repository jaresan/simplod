/**
 * @file Modal component displayed when the user loads a new project, allowing them to make save interactions.
 * @module @@components/controls/modal-info-edit-file
 */
import React from 'react';
import { Button, Modal, Space, Tooltip } from 'antd';
import { translated } from '@@localization';
import { dispatchSet } from '@@app-state';
import * as SolidState from '@@app-state/solid/state';
import styled from '@emotion/styled';
import { openSaveDialogModal } from '@@components/controls/file-dialog';

const Container = styled.div`
  position: relative;
  padding-bottom: 48px;
`;

const ButtonContainer = styled(Space)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const openFileOptionsInfoModal = ({modelURL, hasPermissions}) => {
  const modal = Modal.info({
    maskClosable: true,
    title: translated('Do you want to save the file?'),
    width: 520,
    content: <Container>
      {translated('Please select how you would like to save the file loaded from {modelURL}.', {modelURL})}
      <ButtonContainer>
        {
          hasPermissions ?
            <Button onClick={() => {
              dispatchSet(SolidState.modelFileLocation, modelURL);
              modal.destroy();
            }}>{translated('Edit original file')}</Button>
            :
            <Tooltip title={translated('You do not have permission to edit this file')}>
              <Button disabled onClick={() => {
                dispatchSet(SolidState.modelFileLocation, modelURL);
                modal.destroy();
              }}>{translated('Edit original file')}</Button>
            </Tooltip>
        }
        <Button onClick={() => {
          openSaveDialogModal();
          modal.destroy();
        }}>{translated('Save')}</Button>
        <Button danger onClick={() => modal.destroy()}>{translated('Do not save')}</Button>
      </ButtonContainer>
    </Container>,
    okButtonProps: {
      style: {display: 'none'}
    }
  })
}
