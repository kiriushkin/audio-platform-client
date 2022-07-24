import { types } from '../reducers/loaderReducer.js';

const changeLoaderState = (state = null) => {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_LOADER_STATE,
      state,
    });
  };
};

export default { changeLoaderState };
