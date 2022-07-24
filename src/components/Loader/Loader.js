import './Loader.scss';
import { useLoader } from '../../hooks/index.js';
import { useEffect, useRef } from 'react';

const Loader = () => {
  const { loader } = useLoader();
  const wrapper = useRef(null);

  useEffect(() => {
    wrapper.current.style.opacity = loader ? 1 : 0;
    wrapper.current.style.pointerEvents = loader ? 'auto' : 'none';
  }, [loader]);

  return (
    <div className="loader">
      <div className="loader__wrapper" ref={wrapper}>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
