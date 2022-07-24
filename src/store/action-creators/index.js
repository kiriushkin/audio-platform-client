import tokenActionCreators from './tokenActionCreators.js';
import themeActionCreators from './themeActionCreators.js';
import playerActionCreators from './playerActionCreators.js';
import alertsActionCreators from './alertsActionCreators.js';
import loaderActionCreators from './loaderActionCreators.js';

export default {
  ...tokenActionCreators,
  ...themeActionCreators,
  ...playerActionCreators,
  ...alertsActionCreators,
  ...loaderActionCreators,
};
