const initialValue = {
  value: '',
  id: '',
  role: '',
};

export const types = {
  SET_TOKEN: 'SET_TOKEN',
};

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};

export default reducer;
