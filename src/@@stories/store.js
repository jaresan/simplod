import { createStore } from 'redux';
import rootReducer from 'src/reducers/index';
import 'antd/dist/antd.compact.css';
import { initialState } from './initialState';
import Actions from 'src/actions/model';

export const store = createStore(rootReducer, initialState);
store.dispatch(Actions.Creators.r_dataLoaded());
