/**
 * @file File containing different API calls
 * @type {string}
 * @module @@api
 */
import {humanReadableData} from '@@constants/api';
import { parseTTL } from '@@data/parseTTL';
import {keys} from 'ramda';

/**
 * Fetches human readable data
 * @function
 */
const downloadHumanReadableData = ({urls, prefixToIri, iriToPrefix}) => fetch(humanReadableData, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({urls, prefixToIri, iriToPrefix})
})
  .then(data => data.json());

/**
 * Returns an array of promises for getting the human readable data.
 * @function
 * @param urls [String] Prefixed iris of the entities to search for
 * @param prefixToIri Map of prefix --> IRI
 * @param iriToPrefix Map of IRI --> prefix
 * @returns Array of promises for getting the human readable data.
 */
export const getHumanReadableDataPromises = ({urls, prefixToIri, iriToPrefix}) => urls.map(url => downloadHumanReadableData({urls: [url], prefixToIri, iriToPrefix}));

/**
 * Fetches the .ttl data schema, parses it and returns the parsed data with prefixes
 * @function
 * @param url URL of the data schema to fetch
 * @returns {Promise<{schemaData: *, prefixes: *}>} Schema data and prefixes
 */
export const fetchDataSchema = url => fetch(url)
  .then(res => res.text())
  .then(async ttl => {
    const json = await parseTTL(ttl);
    const schemaData = keys(json.data).reduce((acc, key) =>
      Object.assign(acc, {
        [key]: json.data[key]
      }), {});

    const prefixes = json.__prefixes__;

    return {
      schemaData,
      prefixes
    }
  });
