import './App.scss';
import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from './components/Loader/Loader.js';
import Header from './components/Header/Header.js';
import AlertBox from './components/AlertBox/AlertBox.js';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Upload from './components/Upload/Upload.js';
import actionCreators from './store/action-creators/index.js';
import { useLocalStorage } from './hooks';

const SUN_ICON_CLASS = 'fa-solid fa-sun';
const MOON_ICON_CLASS = 'fa-solid fa-moon';

function App() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { changeTheme } = bindActionCreators(actionCreators, dispatch);

  const cacheTheme = useLocalStorage(theme, 'theme', '');

  useEffect(() => {
    changeTheme(cacheTheme || 'dark');
  }, []);

  return (
    <div className={'app ' + theme}>
      <div className="app__container">
        <Loader />
        <Header />
        <AlertBox />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <button
          className="theme-switch"
          onClick={() => {
            changeTheme();
          }}
        >
          <i
            className={theme === 'dark' ? SUN_ICON_CLASS : MOON_ICON_CLASS}
          ></i>
        </button>
      </div>
    </div>
  );
}

export default App;
