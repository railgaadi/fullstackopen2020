import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import BlogsDisplay from './components/BlogsDisplay';
import BlogDetail from './components/BlogDetail';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import Users from './components/Users';
import UserDetail from './components/UserDetail';

import { initBlogs } from './reducers/blogsReducer';
import { setUser } from './reducers/usersReducer';

const App = () => {
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const userMatch = useRouteMatch('/users/:id');
  const queryUserBlogs = userMatch
    ? blogs.filter(blog => blog.user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blog/:id');
  const queryBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null;

  return (
    <div className='container'>
      {user ? <Navigation user={user} /> : null}
      <Notification />
      <Switch>
        <Route path='/blog/:id'>
          {user ? (
            <BlogDetail blog={queryBlog} loggedInUser={user.username} />
          ) : null}
        </Route>
        <Route path='/users/:id'>
          {user ? <UserDetail userBlogs={queryUserBlogs} /> : <Login />}
        </Route>
        <Route path='/users'>{user ? <Users /> : <Login />}</Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>{user ? <BlogsDisplay /> : <Login />}</Route>
      </Switch>
    </div>
  );
};

export default App;
