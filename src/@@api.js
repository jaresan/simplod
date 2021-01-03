const root = 'https://sparql-proxy-api.jaresantonin.now.sh';

const downloadHumanReadableData = ({urls, prefixToIri, iriToPrefix}) => fetch(`${root}/getData`, {method: 'POST', body: JSON.stringify({urls, prefixToIri, iriToPrefix})}).then(data => data.json())

// export const getHumanReadableData = async ({urls, prefixToIri, iriToPrefix}) => {
//   return await urls.reduce(async (acc, url) => {
//     try {
//       acc = await acc;
//
//       // TODO: Fetch different namespaces in parallel to not have to wait for requests that will 100% not duplicate entries
//       if (!acc[url]) {
//         const data = await downloadHumanReadableData({urls: [url], prefixToIri, iriToPrefix});
//         return Object.assign(acc, data);
//       }
//     } catch (e) {
//       // Swallow the error
//     }
//
//     return acc;
//   }, {});
// };

// FIXME: Don't rely on proxy
export const getHumanReadableDataPromises = ({urls, prefixToIri, iriToPrefix}) => {
  return urls.map(url => downloadHumanReadableData({urls: [url], prefixToIri, iriToPrefix}));
  // return (await Promise.all(promises)).reduce(merge, {});
};
