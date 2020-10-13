import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/usersReducer';

import { Button, Form } from 'react-bootstrap';

const Info = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };
  return (
    <Form inline>
      <Button onClick={handleLogout} variant='outline-dark' size='sm'>
        Logout {user.name}
      </Button>
    </Form>
  );
};

export default Info;
