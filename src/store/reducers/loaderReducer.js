export const types = {
  CHANGE_LOADER_STATE: 'CHANGE_LOADER_STATE',
};

const reducer = (state = true, action) => {
  switch (action.type) {
    case types.CHANGE_LOADER_STATE:
      return action.state ?? !state;
    default:
      return state;
  }
};

export default reducer;
