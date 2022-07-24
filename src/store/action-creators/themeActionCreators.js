import { types } from '../reducers/themeReducer.js';

const changeTheme = (theme = null) => {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_THEME,
      theme,
    });
  };
};

export default { changeTheme };
