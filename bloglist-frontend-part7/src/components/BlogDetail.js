import React from 'react';
import { useField } from '../hooks/index';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLike, deleteOne, addComment } from '../reducers/blogsReducer';

import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Form,
} from 'react-bootstrap';

const BlogDetail = ({ blog, loggedInUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const comment = useField('text');

  if (!blog) return null;

  const handleLikeClick = async () => {
    dispatch(addLike(blog));
  };

  const handleDeleteClick = async () => {
    window.alert(`Delete blog ${blog.title}?`);
    dispatch(deleteOne(blog));
    history.push('/');
  };

  const handleCommentSubmit = event => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment.value));
    comment.onReset();
  };

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs lg='6'>
          <Card className='text-center'>
            <Card.Header>
              <b>Posted by:</b> {blog.user.name}
            </Card.Header>
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>
                <a href={blog.url}>Go to blog</a>
              </Card.Text>
              <Button onClick={handleLikeClick} variant='primary'>
                Like: {blog.likes}
              </Button>
            </Card.Body>
            <Card.Footer className='text-muted'>
              <b>Author:</b> {blog.author}
            </Card.Footer>
            {blog.user.username === loggedInUser ? (
              <Card.Footer className='text-muted'>
                <Button onClick={handleDeleteClick} variant='danger' size='sm'>
                  DELETE
                </Button>
              </Card.Footer>
            ) : null}
          </Card>
          <h3 className='mt-5'>Comments</h3>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Control {...comment} />
            <Button variant='success' type='Submit' className='mt-3'>
              add comment
            </Button>
          </Form>
          <ListGroup variant='flush'>
            {blog.comments.map(comment => (
              <ListGroup.Item key={comment.id}>
                {comment.content}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;
