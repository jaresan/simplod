export const containerHorizontal = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 32,
  gap: 32,
};
export const containerVertical = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 32,
  gap: 32,
};

export const rightMenuHorizontal = {
  overflow: 'auto',
  width: '35%',
  maxWidth: '35%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const graphContainerHorizontal = {
  width: '65%'
};

export const getContainerStyle = horizontalLayout => horizontalLayout ? containerHorizontal : containerVertical;
export const getMenuStyle = horizontalLayout => horizontalLayout ? rightMenuHorizontal : {};
export const getGraphContainerStyle = horizontalLayout => horizontalLayout ? graphContainerHorizontal : {};
