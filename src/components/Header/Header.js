import './Header.scss';
import { useNavigate, useLocation } from 'react-router';
import { useToken, useAlert } from '../../hooks';
import logo from '../../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, clearToken } = useToken();
  const { sendMessage } = useAlert();

  const logoClickHandler = () => {
    navigate('/');
  };

  const loginClickHandler = (e) => {
    e.preventDefault();

    navigate('/login');
  };

  const exitClickHandler = () => {
    clearToken();
    sendMessage('Successful logout', 'You logged out successfully!');
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo" onClick={logoClickHandler}>
          <img src={logo} alt="logo" />
        </div>
        {token.value ? (
          <div className="header__login">
            <div className="header__info">
              You logged in as{' '}
              <span className="highlight">{token.user.role}</span>
            </div>
            <button className="button" onClick={exitClickHandler}>
              <span>Log Out</span>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        ) : location.pathname !== '/login' ? (
          <a
            href="#"
            className="header__login-link button"
            onClick={loginClickHandler}
          >
            <span>Log In</span>
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </a>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

export default Header;
