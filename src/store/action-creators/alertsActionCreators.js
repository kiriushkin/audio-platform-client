import { types } from '../reducers/alertsReducer.js';

const addAlert = (alert) => {
  return (dispatch) => {
    dispatch({
      type: types.ADD_ALERT,
      alert,
    });
  };
};

const removeAlert = (id) => {
  return (dispatch) => {
    dispatch({
      type: types.REMOVE_ALERT,
      id,
    });
  };
};

export default { addAlert, removeAlert };
