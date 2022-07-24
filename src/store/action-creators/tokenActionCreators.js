import { types } from '../reducers/tokenReducer.js';

const setToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_TOKEN,
      token,
    });
  };
};

export default { setToken };
