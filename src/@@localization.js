import { path, view } from 'ramda';
import { getState } from '@@app-state';
import * as SettingsState from '@@app-state/settings/state';

const keys = {
  'There was a problem downloading prefixes for this file.': null,
  'You are logged in as ${webId}.': null,
  'You are not logged in.': null,
  'Either you don\'t have access to the requested resource or the permissions on it are not set up correctly.': null,
  'Saved to ${uri}!': null,
  'Saving to ${uri} failed': null,
  'An error occured while trying to delete the view.': null,
  '${uri} deleted.': null,
  'Current selection is not a connected graph and might result in querying a cartesian product.': null,
  'Show all entities': null,
  'Hide not selected entities': null,
  'Fit to view': null,
  'Clear selection': null,
  'Execute SPARQL Query': null,
  'Do you want to save the file?': null,
  'Please select how you would like to save the file loaded from ${modelURL}.': null,
  'You do not have permission to edit this file': null,
  'Saved value:': null,
  'New value:': null,
  'Configuration changes have been detected between last saved file and the current project:': null,
  'Filename:': null,
  'Data schema URL:': null,
  'Endpoint URL:': null,
  'To get complete save functionality, use your solid pod to save files.': null,
  'Are you sure you want to overwrite last save?': null,
  'Show labels:': null,
  'Turn human readable labels on/off in the entity list': null,
  'Label language:': null,
  'Preferred language of the labels. If not found, will default to English.': null,
  'Application language:': null,
  'View orientation': null,
  'Horizontal': null,
  'Vertical': null,
  'Name of the variable in the resulting SPARQL query': null,
  'This variable can\'t be renamed because it is bound to an existing entity. To change its name, rename the target entity.': null,
  'Prefix could not be renamed as another prefix already exists with this name.': null,
  'Changes not saved': null,
  'Changes saved': null,
  'Latest changes not saved to ${modelFileLocation}': null,
  'File saved at ${modelFileLocation}': null,
  'Property languages:': null,
  'Languages that should appear in the resulting query. Will return every available language if empty.': null,
  'Rename prefixes': null,
  'Allows you to override provided prefixes with your own name': null
};

const en = Object.keys(keys).reduce((acc, txt) => Object.assign(acc, {[txt]: txt}));

const cs = {
  'There was a problem downloading prefixes for this file.': 'Vyskytl se problém při stahování prefixů pro tento soubor',
  'You are logged in as ${webId}.': null,
  'You are not logged in.': "Nejste přihlášen/a",
  'Either you don\'t have access to the requested resource or the permissions on it are not set up correctly.': "Buď nemáte přístup k požadovanému souboru nebo jeho práva nejsou správně nastavena",
  'Saved to ${uri}!': null,
  'Saving to ${uri} failed': null,
  'An error occured while trying to delete the view.': "Vyskytla se chyba při pokusu o smazání souboru",
  '${uri} deleted.': null,
  'Current selection is not a connected graph and might result in querying a cartesian product.': "Aktuální výběr není spojitý graf a mohl by mít za následek dotazování se na kartézský součin",
  'Show all entities': "Zobrazit všechny entity",
  'Hide not selected entities': "Schovat nevybrané entity",
  'Fit to view': "Zmenšit do obrazu",
  'Clear selection': "Zrušit výběr",
  'Execute SPARQL Query': "Provést SPARQL dotaz",
  'Do you want to save the file?': "Chcete uložit soubor?",
  'Please select how you would like to save the file loaded from ${modelURL}.': null,
  'You do not have permission to edit this file': "Nemáte práva upravit tento soubor",
  'Saved value:': "Uložená hodnota:",
  'New value:': "Nová hodnota:",
  'Configuration changes have been detected between last saved file and the current project:': "Byly zaznamenány změny v konfiguraci mezi posledním uloženým souborem a aktuálním projektem:",
  'Filename:': "Jméno souboru:",
  'Data schema URL:': "URL datového schéma:",
  'Endpoint URL:': "URL endpointu:",
  'To get complete save functionality, use your solid pod to save files.': "Pro plnou funkčnost využijte svůj Solid pod k ukládání",
  'Are you sure you want to overwrite last save?': "Opravdu chcete přehrát poslední uloženou verzi?",
  'Show labels:': "Zobrazit popisky:",
  'Turn human readable labels on/off in the entity list': "Zobrazit lidsky čitelná data v seznamu entit",
  'Label language:': "Jazyk popisků:",
  'Preferred language of the labels. If not found, will default to English.': "Preferovaný jazyk popisků. Pokud není k dispozici, použije se angličtina.",
  'Application language:': "Jazyk aplikace:",
  'View orientation': "Orientace aplikace",
  'Horizontal': "Horizontální",
  'Vertical': "Vertikální",
  'Name of the variable in the resulting SPARQL query': "Jméno proměnné ve výsledném SPARQL dotazu",
  'This variable can\'t be renamed because it is bound to an existing entity. To change its name, rename the target entity.': "Tato proměnná nemůže být přejmenována, protože je vázána na existující entitu. K jejímu přejmenování musíte přejmenovat danou entitu.",
  'Prefix could not be renamed as another prefix already exists with this name.': "Prefix nemohl být změněn, neboť prefix s tímto jménem již existuje",
  'Changes not saved': "Změny neuloženy",
  'Changes saved': "Změny uloženy",
  'Latest changes not saved to ${modelFileLocation}': null,
  'File saved at ${modelFileLocation}': null,
  'Property languages:': "Jazyk vlastností:",
  'Languages that should appear in the resulting query. Will return every available language if empty.': "Jazyk, který by se měl zobrazit ve výsledcích. Zobrazí všechny dostupné jazyky, pokud ponecháno prázdné.",
  'Rename prefixes': "Přejmenovat prefixy",
};

const texts = {
  en, cs
};

export const translated = t => {
  const language = view(SettingsState.language, getState());
  return path([language, t], texts) || t;
}

Object.entries(texts).forEach(([ lang, dict]) => {
  Object.keys(keys).forEach(k => !dict[k] && console.warn(`Missing key: '${k}' in the ${lang} variant!`));
});
