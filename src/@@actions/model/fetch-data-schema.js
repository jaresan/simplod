import { parseTTL } from '@@data/parseTTL';
import {keys} from 'ramda';

export const fetchDataSchema = url => fetch(url)
  .then(res => res.text())
  .then(async ttl => {
    const json = await parseTTL(ttl);
    return keys(json.data).reduce((acc, key) =>
      Object.assign(acc, {
        [key]: json.data[key]
      }), {});
  });
