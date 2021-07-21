## Requirements
Node version > 10

Supported browsers: Google Chrome, Mozilla Firefox, Safari

## Local development

* Install the dependencies via `npm i`
* Run the local environment by `npm run start:dev` or `npm run start:dev:https` to use SSL
    * The application is now accessible on http(s)://localhost:3000
    * The server listens to changes to the codebase, and if any are detected, reloads the application.
* OPTIONAL - Add localhost to your trusted apps

If you wish to use a Solid Pod while running the application locally, you have to add the hosting address to your Solid Pod.
This can be done automatically through signing to the Solid Pod in the upper right corner.

## SPARQL Proxy
If the SPARQL endpoint isn't hosted on the same domain as the application, the requests might fail due to CORS or Same-origin policy.
To prevent that, you can use the [Express proxy](https://github.com/jaresan/sparql-proxy/) and set up the linked [YASGUI](https://yasgui.triply.cc/) tool to use it.

The only steps you need to take to achieve that are as follows:

* Deploy the proxy
* Change `const root = 'https://simplod.herokuapp.com';` in `@@constants/api.js` to point to your proxy

## Code documentation
Documentation generated from the code annotations is available on [GitHub Pages](https://jaresan.github.io/simplod/documentation/).
