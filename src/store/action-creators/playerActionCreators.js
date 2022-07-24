import { types } from '../reducers/playerReducer.js';

const setSong = (song) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_SONG,
      song,
    });
  };
};

const setSongs = (songs) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_SONGS,
      songs,
    });
  };
};

const setActualSongs = (actualSongs) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_ACTUAL_SONGS,
      actualSongs,
    });
  };
};

const setVolume = (volume) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_VOLUME,
      volume,
    });
  };
};

const setKeyboardControls = (state) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_KEYBOARD_CONTROLS,
      state,
    });
  };
};

export default {
  setSong,
  setSongs,
  setActualSongs,
  setVolume,
  setKeyboardControls,
};
