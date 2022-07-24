export const types = {
  ADD_ALERT: 'ADD_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_ALERT:
      return [...state, action.alert];
    case types.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.id);
    default:
      return state;
  }
};

export default reducer;
