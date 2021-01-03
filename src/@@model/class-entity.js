import { paths, curry } from 'ramda';

const getField = (languageOrder, field, data) => paths(languageOrder.map(l => [l, field]), data).find(a => a);

export const updateLanguageInfo = curry((language, e) => {
  const languageOrder = [language, 'en', 'de', 'default'];

  const info = e.info || {};

  // Object.assign({}, ...) to get a new copy
  return Object.assign({}, e, {
    info: {
      ...info,
      label: getField(languageOrder, 'label', e.info.byLanguage),
      description: getField(languageOrder, 'description', e.info.byLanguage)
    }
  })
});
