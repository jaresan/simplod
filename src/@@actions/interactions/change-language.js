import { view, map } from 'ramda';
import { dispatchSet, getState } from '@@app-state';
import * as ModelState from '@@app-state/model/state';
import * as SettingsState from '@@app-state/settings/state';
import {updateLanguageInfo} from '@@model/class-entity';

export const changeLanguage = language => {
  dispatchSet(SettingsState.language, language);
  const state = getState();
  const classes = view(ModelState.classes, state);
  const updatedClasses = map(updateLanguageInfo(language), classes);

  dispatchSet(ModelState.classes, updatedClasses);
}
