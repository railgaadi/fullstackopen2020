import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/index';
import { loginUser } from '../reducers/usersReducer';

import { Form, Button, Container, Row } from 'react-bootstrap';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const username = useField('text');
  const password = useField('password');

  const handleLogin = async event => {
    event.preventDefault();
    dispatch(loginUser({ username: username.value, password: password.value }));
    history.push('/');
  };

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Form onSubmit={handleLogin}>
          <h2>Login here</h2>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control {...username} />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control {...password} />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
