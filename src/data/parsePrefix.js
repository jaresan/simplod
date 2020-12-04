export const parsePrefix = (prefixes, iri) => {
  const suffix = iri.replace(/.*(\/|#)/, '');
  const prefixIri = iri.replace(/(\/|#)[^/#]*$/, '$1');
  const alias = prefixes[prefixIri] || 'ns';

  return {
    alias,
    suffix,
    prefixIri
  }
};

export const prefix = (prefixes, iri) => {
  const {alias, suffix} = parsePrefix(prefixes, iri);
  return `${alias}:${suffix}`;
}
