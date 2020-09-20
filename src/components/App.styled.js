import React from 'react';

export const containerHorizontal = {
  display: 'flex',
  flexDirection: 'row',
  margin: 32,
  height: 1000
};
export const containerVertical = {
  margin: 32
};

export const rightMenuHorizontal = {
  maxWidth: '50%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column'
};

export const getContainerStyle = horizontalLayout => horizontalLayout ? containerHorizontal : containerVertical;
export const getMenuStyle = horizontalLayout => horizontalLayout ? rightMenuHorizontal : {};
