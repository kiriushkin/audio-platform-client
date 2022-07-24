import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../store/action-creators/index.js';

const useLoader = () => {
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  const AC = bindActionCreators(actionCreators, dispatch);

  const { changeLoaderState } = AC;

  return { loader, changeLoaderState };
};

export default useLoader;
