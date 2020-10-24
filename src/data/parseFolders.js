import rdf from 'rdflib';
import auth from 'solid-auth-client';

window.a = `@prefix : </#>.
@prefix j: <>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix terms: <http://purl.org/dc/terms/>.
@prefix XML: <http://www.w3.org/2001/XMLSchema#>.
@prefix n0: </.well-known/>.
@prefix inbox: </inbox/>.
@prefix priv: </private/>.
@prefix pro: </profile/>.
@prefix pub: </public/>.
@prefix set: </settings/>.
@prefix st: <http://www.w3.org/ns/posix/stat#>.
@prefix vnd: <http://www.w3.org/ns/iana/media-types/image/vnd.microsoft.icon#>.
@prefix c: </profile/card#>.
@prefix ter: <http://www.w3.org/ns/solid/terms#>.
@prefix pl: <http://www.w3.org/ns/iana/media-types/text/plain#>.

j:
    a ldp:BasicContainer, ldp:Container;
    terms:modified "2020-10-24T11:37:40Z"^^XML:dateTime;
    ldp:contains
    n0:, </favicon.ico>, inbox:, priv:, pro:, pub:, </robots.txt>, set:;
    st:mtime 1603539460.39;
    st:size 4096.
n0:
    a ldp:BasicContainer, ldp:Container, ldp:Resource;
    terms:modified "2020-10-23T12:52:36Z"^^XML:dateTime;
    st:mtime 1603457556.896;
    st:size 4096.
</favicon.ico>
    a vnd:Resource, ldp:Resource;
    terms:modified "2020-10-23T12:52:36Z"^^XML:dateTime;
    st:mtime 1603457556.896;
    st:size 4286.
inbox:
    a ldp:BasicContainer, ldp:Container, ldp:Resource;
    terms:modified "2020-10-23T12:52:36Z"^^XML:dateTime;
    st:mtime 1603457556.892;
    st:size 4096.
priv:
    a ldp:BasicContainer, ldp:Container, ldp:Resource;
    terms:modified "2020-10-23T12:52:36Z"^^XML:dateTime;
    st:mtime 1603457556.892;
    st:size 4096.
pro:
    a ldp:BasicContainer, ldp:Container, ldp:Resource;
    terms:modified "2020-10-24T11:37:34Z"^^XML:dateTime;
    st:mtime 1603539454.366;
    st:size 4096.
c:me ter:account j:.

pub:
    a ldp:BasicContainer, ldp:Container, ldp:Resource;
    terms:modified "2020-10-23T13:03:43Z"^^XML:dateTime;
    st:mtime 1603458223.44;
    st:size 4096.
</robots.txt>
    a pl:Resource, ldp:Resource;
    terms:modified "2020-10-23T12:52:36Z"^^XML:dateTime;
    st:mtime 1603457556.892;
    st:size 83.
set:
    a ldp:BasicContainer, ldp:Container, ldp:Resource;
    terms:modified "2020-10-24T11:37:24Z"^^XML:dateTime;
    st:mtime 1603539444.194;
    st:size 4096.
`

window.getQuads = (ttlString, baseIRI) => new Promise(async (res, err) => {
  const parser = new Parser({baseIRI});
  const quads = [];

  parser.parse(ttlString, (error, quad, prefixes) => {
    if (quad) {
      quads.push(quad);
    } else if (!error) {
      res({quads, prefixes});
    }
  });
});

window.parseTTL = (ttlString, baseIRI) => getQuads(ttlString, baseIRI);
window.Parser = Parser;
window.getFolders2 = async url => {
  url = url.replace(/\/?$/, '/');
  const ttl = await window.get(url);

  const store = new rdf.graph();
  rdf.parse(ttl, store, url);
  const LDP = rdf.Namespace('http://www.w3.org/ns/ldp#')
  const NS = rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');

  const resource = LDP('Resource');
  const container = LDP('Container');
  const type = NS('type');

  const files = store.statementsMatching(null, type, resource).map(s => s.subject.value);
  const folders = store.statementsMatching(null, type, container).map(s => s.subject.value);

  return {
    current: url,
    folders,
    files: r.difference(files, folders)
  }
};
window.getFolders = async url => {
  url = url.replace(/\/?$/, '/');
  const ttl = await window.get(url);
  return await parseTTL(ttl, url)
    .then(({quads}) => {
      window.quads = quads;
      const folders = quads.filter(s => s.object.id === "http://www.w3.org/ns/ldp#Container").map(s => s.subject.value);
      const files = quads.filter(s => s.object.id === "http://www.w3.org/ns/ldp#Resource").map(s => s.subject.value).filter(f => !folders.includes(f));
      return {folders, files}
    })
}

await window.getFolders('https://jaresan.inrupt.net');


const files = {
  '/': {
    '.well-known':{},
    inbox: {},
    private: {},
    profile: {},
    public: {misc: {}, __files: []},
    settings: {},
    __files: ["favicon.ico", "robots.txt"]
  }
};
// {
//   title: 'parent 1',
//     key: '0-0',
//   children: [
//   {
//     title: 'parent 1-0',
//     key: '0-0-0',
//     children: [
const getTree = ([key, content]) => console.log(key, content) || ({
  title: key,
  key: key,
  children: typeof content === 'object' ? Object.entries(content).map(getTree) : []
})


window.rdf = rdf;
window.auth = auth;
window.get = async url => {
  const res = await auth.fetch(url);
  const txt = await res.text();

  window.txt = txt;
  return txt;
}
