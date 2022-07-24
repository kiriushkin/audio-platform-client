import './Modal.scss';
import { useState } from 'react';

const Modal = ({ props }) => {
  const { title, text, onConfirm, onCancel } = props;
  const [isFadeOut, setIsFadeOut] = useState(false);

  return (
    <div className={'modal' + (isFadeOut ? ' modal_fade-out' : '')}>
      <div className={'modal__wrapper'}>
        <div className="modal__container">
          <div className="modal__title">{title}</div>
          <div className="modal__text">{text}</div>

          <div className="modal__buttons">
            <button
              className="modal__confirm button"
              onClick={() => {
                setIsFadeOut(true);
                onConfirm();
              }}
            >
              Confirm
            </button>
            <button
              className="modal__cancel button"
              onClick={() => {
                setIsFadeOut(true);
                onCancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
