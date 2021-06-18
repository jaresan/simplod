export const parsePrefix = (prefixes, iri) => {
  const suffix = iri.replace(/.*(\/|#)/, '');
  const prefixIri = iri.replace(/(\/|#)[^/#]*$/, '$1');
  const alias = prefixes[prefixIri] || 'ns_';

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

export const getSuffix = iri => {
  const suffixMatch = iri.match(/([^/#:]+)$/);
  return suffixMatch && suffixMatch[1];
}

export const getPrefix = iri => {
  const prefixMatch = iri.match(/(^\w+):/);
  return prefixMatch && prefixMatch[1];
};
