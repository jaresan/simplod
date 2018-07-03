import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'src/reducers/index';
import sagas from 'src/sagas/index';

const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(sagaMiddleware, thunk);

if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
	middleware = compose(middleware, window.devToolsExtension());
}

// create the store
const store = createStore(rootReducer, middleware);
sagaMiddleware.run(sagas);

// export
export default store;
