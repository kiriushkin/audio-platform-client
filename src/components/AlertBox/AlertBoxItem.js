import { useEffect, useState } from 'react';
import { useAlert } from '../../hooks/index.js';

const AlertBoxItem = ({ alert }) => {
  const { alerts, removeAlert } = useAlert();

  const [isClosing, setIsClosing] = useState(false);

  const onClickHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      removeAlert(alert.id);
    }, 500);
  };

  useEffect(() => {
    setTimeout(onClickHandler, 5000);
  }, []);

  return (
    <div
      className={`alert-box__item alert-box__item_${alert.type} ${
        isClosing ? 'alert-box__item_close' : ''
      }`}
    >
      <div className="alert-box__item-title">{alert.title}</div>
      <div className="alert-box__item-text">{alert.text}</div>
      <button className="alert-box__item-close" onClick={onClickHandler}>
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
};

export default AlertBoxItem;
