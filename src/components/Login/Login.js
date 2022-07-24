import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useToken } from '../../hooks';
import LoginForm from './LoginForm/LoginForm.js';

const Login = () => {
  const navigate = useNavigate();
  const { token } = useToken();

  useEffect(() => {
    if (token.value) navigate('/');
  }, []);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
