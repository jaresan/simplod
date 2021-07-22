/**
 * @file HOC adding a search bar to the given component
 * @module @@components/withSearch
 */
import React from 'react';
import {Input} from 'antd';
import {useState} from 'react';

export const withSearch = Component => props => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Input.Search onChange={e => setSearchText(e.target.value)} />
      <Component searchText={searchText} {...props} />
    </>
  )
}
