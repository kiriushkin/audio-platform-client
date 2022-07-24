import './AlertBox.scss';
import { useAlert } from '../../hooks/index.js';
import AlertBoxItem from './AlertBoxItem.js';

const AlertBox = () => {
  const { alerts } = useAlert();

  return (
    <div className="alert-box">
      <div className="alert-box__container">
        {alerts.map((alert) => (
          <AlertBoxItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertBox;
