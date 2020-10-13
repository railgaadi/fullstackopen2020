import React from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/index';

import { createBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

import { Form, Button } from 'react-bootstrap';

const BlogForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      createBlog({ title: title.value, author: author.value, url: url.value })
    );
    dispatch(
      setNotification(`New blog ${title.value} added, by ${author.value}`)
    );
    title.onReset();
    author.onReset();
    url.onReset();
  };

  return (
    <div>
      <h2 className='mt-3'>Add new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formNewBlog'>
          <Form.Label>Blog Title:</Form.Label>
          <Form.Control {...title}></Form.Control>
          <Form.Label>Blog Author:</Form.Label>
          <Form.Control {...author}></Form.Control>
          <Form.Label>Blog URL:</Form.Label>
          <Form.Control {...url}></Form.Control>
          <Button className='mt-2' type='submit' variant='success'>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
