import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification('Wrong credentials!');
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogUser');
    setUser(null);
  };

  const handleNewBlog = async (blogObj) => {
    try {
      const result = await blogService.postBlog(blogObj);
      setNotification(`New blog ${blogObj.title} added, by ${blogObj.author}`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      setBlogs(blogs.concat(result));
    } catch (error) {
      setNotification('Something weng wrong');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleDelete = async (blogObj) => {
    window.alert(`Delete blog ${blogObj.title}?`);
    try {
      await blogService.deleteBlog(blogObj.id);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (error) {
      setNotification(error.message);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Login here</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            name='username'
            id='username'
          />
        </div>
        <div>
          password
          <input
            type='password'
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            name='password'
            id='password'
          />
        </div>
        <button type='submit' id='login-button'>
          Submit
        </button>
      </form>
    </div>
  );

  const blogDisplay = () => (
    <div>
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>logout?</button>
      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedInUser={user.username}
            handleDelete={handleDelete}
          />
        ))}
      <Togglable openLabel='New Blog' closeLabel='cancel'>
        <BlogForm createBlog={handleNewBlog} />
      </Togglable>
    </div>
  );

  return (
    <div>
      {user ? blogDisplay() : loginForm()}
      {notification ? <Notification notification={notification} /> : null}
    </div>
  );
};

export default App;
