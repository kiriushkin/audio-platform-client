import './LoginForm.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApi, useAlert, useToken } from '../../../hooks';

const LoginForm = () => {
  const navigate = useNavigate();
  const { auth } = useApi();
  const { sendMessage, sendError } = useAlert();
  const { updateToken } = useToken();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = { name: login, password };

    const resp = await auth(formData);

    if (resp.status !== 200) return sendError('Error', resp.data.message);

    updateToken(resp.data);
    sendMessage('Successful autorization', 'You logined successfully!');

    navigate('/');
  };

  return (
    <div className="login-form">
      <div className="login-form__container">
        <div className="login-form__title">Login</div>

        <form className="login-form__form" onSubmit={onSubmitHandler}>
          <input
            type="text"
            className="login-form__login"
            required
            onChange={(e) => {
              setLogin(e.target.value);
            }}
            value={login}
          />
          <input
            type="password"
            className="login-form__password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button className="login-form__submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
