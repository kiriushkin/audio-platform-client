import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nanoid } from 'nanoid';
import actionCreators from '../store/action-creators/index.js';

const useAlert = () => {
  const { alerts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { addAlert, removeAlert } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const sendMessage = (title, text) => {
    const alert = {
      id: nanoid(8),
      type: 'message',
      title,
      text,
    };

    addAlert(alert);
  };

  const sendWarning = (title, text) => {
    const alert = {
      id: nanoid(8),
      type: 'warning',
      title,
      text,
    };

    addAlert(alert);
  };

  const sendError = (title, text) => {
    const alert = {
      id: nanoid(8),
      type: 'error',
      title,
      text,
    };

    addAlert(alert);
  };

  return { alerts, sendMessage, sendWarning, sendError, removeAlert };
};

export default useAlert;
