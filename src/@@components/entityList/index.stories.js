import React from 'react';
import {EntityList} from './EntityList';
import {EntityEntry} from './EntityEntry';
import {PropertyEntry} from './PropertyEntry';
import { getRandomEntityId, getRandomPropertyId, withProvider } from '@@stories';

export default {
  title: 'Entity list',
  decorators: [withProvider]
};

export const List = () => (
  <EntityList />
);

export const Entity = () => (
  <EntityEntry id={getRandomEntityId()}/>
);

export const Property = () => (
  <PropertyEntry id={getRandomPropertyId()} />
);
