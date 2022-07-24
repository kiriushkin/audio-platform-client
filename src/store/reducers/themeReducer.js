export const types = {
  CHANGE_THEME: 'CHANGE_THEME',
};

const reducer = (state = '', action) => {
  switch (action.type) {
    case types.CHANGE_THEME:
      if (action.theme) return action.theme;
      return state === 'dark' ? 'light' : 'dark';
    default:
      return state;
  }
};

export default reducer;
