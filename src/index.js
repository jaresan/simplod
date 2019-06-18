import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';

if (process.env.NODE_ENV === 'development') {
  window.endpointURL = "https://linked.opendata.cz/sparql";
  window.ttlURL = "http://localhost:5000/api/easyExample";
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
