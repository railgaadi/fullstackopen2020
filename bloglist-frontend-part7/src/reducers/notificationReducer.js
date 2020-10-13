const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (msg) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIF',
      notification: msg,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIF',
        notification: '',
      });
    }, 2000);
  };
};

export default reducer;
