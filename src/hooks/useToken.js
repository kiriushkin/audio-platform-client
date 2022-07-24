import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../store/action-creators/index.js';

const useToken = () => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { setToken } = bindActionCreators(actionCreators, dispatch);

  const checkToken = () => {
    const cacheToken = window.localStorage.getItem('token');
    if (cacheToken) setToken(JSON.parse(cacheToken));
  };

  const updateToken = (token) => {
    window.localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  };

  const clearToken = () => {
    window.localStorage.removeItem('token');
    setToken({});
  };

  useEffect(() => {
    if (!token.value) checkToken();
  }, []);

  return { token, updateToken, clearToken };
};

export default useToken;
