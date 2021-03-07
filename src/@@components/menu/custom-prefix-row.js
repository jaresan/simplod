import React, { useState } from 'react';
import { Select, Space, Input, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { fromEvent } from '@@data/utils';
import { invertObj } from 'ramda';
import { translated } from '@@localization';

export const CustomPrefixRow = ({value, onChangeName, onDeletePrefix, prefixes, customPrefixes}) => {
  const renameMap = invertObj(customPrefixes);
  const [newName, setNewName] = useState(renameMap[value]);
  const [selectValue, setSelectValue] = useState(value);

  const onNameSubmit = e => {
    const value = e.target.value;

    if (customPrefixes[value] === selectValue) return;
    if (!value && selectValue) {
      onDeletePrefix(renameMap[selectValue]);
      return;
    }
    if (!value) {
      return;
    }
    if (prefixes[value]) {
      message.error(translated(`Prefix could not be renamed as another prefix already exists with this name.`))
      setNewName(renameMap[selectValue]);
      e.target.blur();
    } else {
      onChangeName(selectValue, value);
    }
  };

  return <Space>
    <Select onChange={setSelectValue} value={selectValue} style={{minWidth: 64}}>
      {
        Object.keys(prefixes).concat(Object.values(customPrefixes))
          .filter(p => !customPrefixes[p])
          .map(p => <Select.Option disabled={renameMap[p]} key={p} value={p}>{p}</Select.Option>)
      }
    </Select>
    <Input
      onPressEnter={onNameSubmit}
      onBlur={onNameSubmit}
      value={newName}
      onChange={fromEvent(setNewName)}
    />
    {selectValue && <DeleteOutlined onClick={() => onDeletePrefix(renameMap[selectValue])} />}
  </Space>
}
