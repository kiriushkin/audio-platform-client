const initialValue = {
  song: {},
  songs: [],
  actualSongs: [],
  volume: {},
  isKeyboardControls: true,
};

export const types = {
  SET_SONG: 'SET_SONG',
  SET_SONGS: 'SET_SONGS',
  SET_ACTUAL_SONGS: 'SET_ACTUAL_SONGS',
  SET_VOLUME: 'SET_VOLUME',
  SET_KEYBOARD_CONTROLS: 'SET_KEYBOARD_CONTROLS',
};

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case types.SET_SONG:
      return { ...state, song: action.song };
    case types.SET_SONGS:
      return { ...state, songs: action.songs };
    case types.SET_ACTUAL_SONGS:
      return { ...state, actualSongs: action.actualSongs };
    case types.SET_VOLUME:
      return { ...state, volume: action.volume };
    case types.SET_KEYBOARD_CONTROLS:
      return { ...state, isKeyboardControls: action.state };
    default:
      return state;
  }
};

export default reducer;
