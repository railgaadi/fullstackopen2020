import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ attemptLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  LoginForm.propTypes = {
    attemptLogin: PropTypes.func.isRequired,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    attemptLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login to add notes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username{' '}
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name='username'
            id='username'
          />
        </div>
        <div>
          password{' '}
          <input
            type='text'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id='password'
          />
        </div>
        <div>
          <button id='loginButton' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
