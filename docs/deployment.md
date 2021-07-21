## Requirements
Node version > 10

Supported browsers: Google Chrome, Mozilla Firefox, Safari

## Production deployment
Since this application is created with [Create React App](https://create-react-app.dev), you can follow the [deployment manual](https://create-react-app.dev/docs/deployment/) directly, or follow the steps below:

* Install dependencies: `npm install`
* Get production build: `npm run build`
* Publish the `build` folder and make `index.html` accessible
* You can utilize the following parameters in the URL for the application to present different data on user's access
    * `schemaURL=` - URL of the data schema to be loaded in the application
    * `endpointURL=` - URL of the endpoint to be used
    * `modelURL=` - URL of the file to be loaded, works the same way as File &rarr; Load &rarr; By URI
        * Overrides both `schemaURL` and `endpointURL`
* Example `https://jaresan.github.io/simplod/build/index.html?schemaURL=https%3A%2F%2Fjaresan.github.io%2Fsimplod%2Fexamples%2Fnobel_prizes.ttl&endpointURL=http%3A%2F%2Fdata.nobelprize.org%2Fstore%2Fsparql`

## SPARQL Proxy
If the SPARQL endpoint isn't hosted on the same domain as the application, the requests might fail due to CORS or Same-origin policy.
To prevent that, you can use the [Express proxy](https://github.com/jaresan/sparql-proxy/) and set up the linked [YASGUI](https://yasgui.triply.cc/) tool to use it.

The only steps you need to take to achieve that are as follows:

* Deploy the proxy
* Change `const root = 'https://simplod.herokuapp.com';` in `@@constants/api.js` to point to your proxy
