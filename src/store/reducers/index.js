import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer.js';
import themeReducer from './themeReducer.js';
import playerReducer from './playerReducer.js';
import alertsReducer from './alertsReducer.js';
import loaderReducer from './loaderReducer.js';

const reducers = combineReducers({
  token: tokenReducer,
  theme: themeReducer,
  player: playerReducer,
  alerts: alertsReducer,
  loader: loaderReducer,
});

export default reducers;
