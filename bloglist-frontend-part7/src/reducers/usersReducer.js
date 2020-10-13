import blogService from '../services/blogs';
import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'LOGIN_USER':
      return action.data;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user,
    });
  };
};

export const loginUser = (loginObj) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginObj);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
      dispatch({
        type: 'LOGIN_USER',
        data: user,
      });
      dispatch(setNotification(`${user.username} logged in!`));
    } catch (error) {
      dispatch(setNotification('Wrong credentials!'));
    }
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedInBlogUser');
  return {
    type: 'LOGOUT_USER',
  };
};

export default reducer;
