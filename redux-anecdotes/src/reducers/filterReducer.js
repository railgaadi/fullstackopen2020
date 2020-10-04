const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.value;
    default:
      return state;
  }
};

export const filter = (value) => {
  return {
    type: 'FILTER',
    value,
  };
};

export default reducer;
