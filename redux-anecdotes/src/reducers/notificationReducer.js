const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIF': {
      return action.notification;
    }
    default:
      return state;
  }
};

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIF',
      notification: msg,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIF',
        notification: '',
      });
    }, time * 1000);
  };
};

export default reducer;
