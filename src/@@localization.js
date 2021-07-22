/**
 * @file Helper functions for mapping strings between languages.
 * All of the strings throughout the application are in English and are translated directly
 * via 1-1 mapping.
 * @module @@localization
 */
import { path, view, assocPath, isEmpty } from 'ramda';
import { getState } from '@@app-state';
import * as SettingsState from '@@app-state/settings/state';

const keys = {
  'Loading labels': null,
  'Download file': null,
  'Upload file': null,
  'Save to browser storage': null,
  'Load from browser storage': null,
  'Last file:': null,
  'Your files:': null,
  'Login to see your Solid Pod files': null,
  'Save': null,
  'Load': null,
  'Overwrite': null,
  'Delete': null,
  'There was a problem fetching files from the folder.': null,
  'Downloading human readable labels:': null,
  'Edit original file': null,
  'Do not save': null,
  'Tries left:': null,
  'Retrying in': null,
  'Copy entity': null,
  'Delete entity': null,
  'Hide entity in the graph': null,
  'Show entity in the graph': null,
  'Data property': null,
  'Object property': null,
  'No data selected, begin by selecting some properties in the "Available" tab.': null,
  'Hide entity in the result set': null,
  'Show entity in the result set': null,
  'Hide from result set': null,
  'Show in result set': null,
  'Mark as required': null,
  'Mark as optional': null,
  'New object': null,
  'You can reorder the result set columns here after selecting some properties.': null,
  'Result column order:': null,
  'Maximum number of results (limit):': null,
  'Use limit:': null,
  'Available': null,
  'Selected': null,
  'File': null,
  'New': null,
  'Properties': null,
  'Data schema URL': null,
  'URL from which the data schema should be retrieved': null,
  'URL of the SPARQL endpoint against which the query is run': null,
  'Title of the project': null,
  'Text description of what this project represents': null,
  'Description': null,
  'Title:': null,
  'Endpoint URL': null,
  'Project title': null,
  'File description': null,
  'Settings': null,
  'Logout': null,
  'Login': null,
  'Run SPARQL Query': null,
  'Share': null,
  'Untitled': null,
  'Create': null,
  'From example': null,
  'All languages': null,
  'Direct application URL': null,
  'Current file URL': null,
  'To be able to share this file via this application, please save it first.': null,
  'Save file': null,
  'Private': null,
  'Public/Read': null,
  'Public/Write': null,
  'Data fetching links': null,
  'App links': null,
  'There was a problem downloading prefixes for this file.': null,
  'You are logged in as {webId}.': null,
  'You are not logged in.': null,
  'Either you don\'t have access to the requested resource or the permissions on it are not set up correctly.': null,
  'Saved to {uri}!': null,
  'Saving to {uri} failed': null,
  'An error occured while trying to delete the view.': null,
  '{uri} deleted.': null,
  'Current selection is not a connected graph and might result in querying a cartesian product.': null,
  'Show all entities': null,
  'Hide not selected entities': null,
  'Fit to view': null,
  'Clear selection': null,
  'Execute SPARQL Query': null,
  'Do you want to save the file?': null,
  'Please select how you would like to save the file loaded from {modelURL}.': null,
  'You do not have permission to edit this file': null,
  'Saved value:': null,
  'New value:': null,
  'Configuration changes have been detected between last saved file and the current project:': null,
  'Filename:': null,
  'Data schema URL:': null,
  'Endpoint URL:': null,
  'To get complete save functionality, ': null,
  'use your solid pod to save files.': null,
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
  'Latest changes not saved to {modelFileLocation}': null,
  'File saved at {modelFileLocation}': null,
  'Property languages:': null,
  'Languages that should appear in the resulting query. Will return every available language if empty.': null,
  'Rename prefixes': null,
  'Allows you to override provided prefixes with your own name': null,
  'Reload schema': null
};

const en = Object.keys(keys).reduce((acc, txt) => Object.assign(acc, {[txt]: txt}), {});

const cs = {
  'There was a problem downloading prefixes for this file.': 'Vyskytl se problém při stahování prefixů pro tento soubor',
  'You are logged in as {webId}.': 'Jste přihlášen jako {webId}.',
  'You are not logged in.': "Nejste přihlášen/a",
  'Either you don\'t have access to the requested resource or the permissions on it are not set up correctly.': "Buď nemáte přístup k požadovanému souboru nebo jeho práva nejsou správně nastavena",
  'Saved to {uri}!': 'Uloženo pod {uri}!',
  'Saving to {uri} failed': 'Ukládání pod {uri} selhalo',
  'An error occured while trying to delete the view.': "Vyskytla se chyba při pokusu o smazání souboru",
  '{uri} deleted.': '{uri} smazáno.',
  'Current selection is not a connected graph and might result in querying a cartesian product.': "Aktuální výběr není spojitý graf a mohl by mít za následek dotazování se na kartézský součin",
  'Show all entities': "Zobrazit všechny entity",
  'Hide not selected entities': "Schovat nevybrané entity",
  'Fit to view': "Zmenšit do obrazu",
  'Clear selection': "Zrušit výběr",
  'Execute SPARQL Query': "Provést SPARQL dotaz",
  'Do you want to save the file?': "Chcete uložit soubor?",
  'Please select how you would like to save the file loaded from {modelURL}.': 'Prosím vyberte, jak chcete uložit soubor nahraný z {modelURL}.',
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
  'Latest changes not saved to {modelFileLocation}': 'Poslední změny neuloženy do {modelFileLocation}',
  'File saved at {modelFileLocation}': 'Soubor uložen na {modelFileLocation}',
  'Property languages:': "Jazyk vlastností:",
  'Languages that should appear in the resulting query. Will return every available language if empty.': "Jazyk, který by se měl zobrazit ve výsledcích. Zobrazí všechny dostupné jazyky, pokud ponecháno prázdné.",
  'Rename prefixes': "Přejmenovat prefixy",
  'Download file': 'Stáhnout soubor',
  'Upload file': 'Nahrát soubor',
  'Save to browser storage': 'Uložit do prohlížeče',
  'Load from browser storage': 'Nahrát z prohlížeče',
  'Last file:': "Poslední soubor:",
  'Your files:': "Vaše soubory:",
  'Login to see your Solid Pod files': "Přihlaste se k zobrazení Vašich Solid Pod souborů",
  'Save': "Uložit",
  'Load': "Nahrát",
  'Overwrite': "Přepsat",
  'Delete': "Smazat",
  'There was a problem fetching files from the folder.': "Vyskytl se problém při stahování souborů z adresáře.",
  'Downloading human readable labels:': "Stahuji lidsky čitelné popisky.",
  'Edit original file': "Upravit původní soubor",
  'Do not save': "Neukládat",
  'Tries left:': "Zbývající pokusy:",
  'Retrying in': "Další pokus v",
  'Copy entity': "Zkopírovat entitu",
  'Delete entity': "Smazat entitu",
  'Hide entity in the graph': "Schovat entitu v grafu",
  'Show entity in the graph': "Zobrazit entitu v grafu",
  'Data property': "Datová vlastnost",
  'Object property': "Objektová vlastnost",
  'No data selected, begin by selecting some properties in the "Available" tab.': 'Žádná data nebyla vybrána. Začněte výběrem v záložce "Dostupné".',
  'Hide entity in the result set': "Vynechat entitu z výsledku dotazu",
  'Show entity in the result set': "Zobrazit entitu ve výsledku dotazu",
  'Hide from result set': "Vynechat z výsledku dotazu",
  'Show in result set': "Zobrazit ve výsledku dotazu",
  'Mark as required': "Označit za povinné",
  'Mark as optional': "Označit jako nepovinné",
  'New object': "Nový objekt",
  'You can reorder the result set columns here after selecting some properties.': "Můžete přeřadit zobrazení sloupců ve výsledku dotazu po zvolení nějakých vlastností.",
  'Result column order:': "Pořadí sloupců ve výsledku dotazu:",
  'Maximum number of results (limit):': "Maximální počet výsledků (limit):",
  'Use limit:': "Použít limit:",
  'Available': "Dostupné",
  'Selected': "Vybrané",
  'File': "Soubor",
  'New': "Nový",
  'Properties': "Vlastnosti",
  'Data schema URL': "URL datového schématu",
  'URL from which the data schema should be retrieved': "URL, ze kterého by se mělo stáhnout datové schéma",
  'URL of the SPARQL endpoint against which the query is run': "URL SPARQL endpointu, oproti kterému je spuštěný dotaz",
  'Title of the project': "Název projektu",
  'Text description of what this project represents': "Textový popis co tento projekt reprezentuje",
  'Description': "Popis",
  'Title:': "Názet",
  'Endpoint URL': "URL endpointu",
  'Project title': "Název projektu",
  'File description': "Popis souboru",
  'Settings': "Nastavení",
  'Logout': "Odhlásit",
  'Login': "Přihlásit",
  'Run SPARQL Query': "Spustit SPARQL dotaz",
  'Share': "Sdílet",
  'Untitled': "Bez názvu",
  'Create': "Vytvořit",
  'From example': "Z příkladu",
  'All languages': "Všechny jazyky",
  'Direct application URL': "URL aplikace",
  'Current file URL': "URL aktuálního souboru",
  'To be able to share this file via this application, please save it first.': "Ke sdílení tohoto souboru ho prosím nejdříve uložte",
  'Save file': "Uložit soubor",
  'Private': "Soukromý",
  'Public/Read': "Veřejný/čtení",
  'Public/Write': "Veřejný/zápis",
  'Data fetching links': "Odkazy na stahování dat",
  'App links': "Odkazy do aplikace",
  'To get complete save functionality, ': "Pro kompletní funke úložiště ",
  'use your solid pod to save files.': "využijte svůj Solid Pod na ukládání souborů",
  'Allows you to override provided prefixes with your own name': "Umožňuje přepsání dostupných prefixů vlastními",
  'Reload schema': "Nahrát schéma",
  'Loading labels': "Nahrávání popisků"
};

const texts = {
  en, cs
};

/**
 * Returns translation for given text based on current application language selected
 * with replacing ${VAR} with variables taken from the second argument.
 * @function
 * @param t
 * @param args
 * @returns {*}
 */
export const translated = (t, args) => {
  const language = view(SettingsState.language, getState());
  const text = path([language, t], texts) || t;

  if (!args) {
    return text;
  }

  return Object.entries(args).reduce((acc, [key, value]) => acc.replace(`{${key}}`, value), text);
}

/**
 * Writes warnings into the console for missing translations
 */
Object.entries(texts).forEach(([ lang, dict]) => {
  const missingTranslations = Object.keys(keys).reduce((acc, k) => {
    if (!dict[k]) {
      return assocPath([lang, k], true, acc);
    }
    return acc;
  }, {});

  if (!isEmpty(missingTranslations)) {
    console.warn(`Found missing translations for ${lang}!`, missingTranslations);
  }
});
