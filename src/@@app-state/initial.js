import {initial as yasgui} from '@@app-state/yasgui/state';
import {initial as solid} from '@@app-state/solid/state';
import {initial as model} from '@@app-state/model/state';
import {initial as settings} from '@@app-state/settings/state';

export const initial = {
  yasgui,
  solid,
  model,
  settings
};