import { createStore } from 'redux';
import rootReducer from 'src/reducers/index';
import 'antd/dist/antd.compact.css';
import { initialState } from './initialState';

export const store = createStore(rootReducer, initialState);
