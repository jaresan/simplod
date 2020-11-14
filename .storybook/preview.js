import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import { addParameters } from '@storybook/react';

export const parameters = {
  backgrounds: {
    values:[
      { name: "white", value: '#FFF' },
      { name: "black", value: '#000' },
    ]
  },
  actions: { argTypesRegex: "^on[A-Z].*" }
};

const features = new Proxy(
  {},
  {
    get(_, prop) {
      console.log(`Requested feature "${prop}" => true`);
      return true;
    },
  }
);

addons.setConfig({
  theme: themes.dark,
});

addParameters({
  options: {
    theme: themes.light,
  },
})


window.BUILD_CONFIG = {
  features,
};
