import React from 'react';
import { useSelector } from 'react-redux';

import { ListGroup } from 'react-bootstrap';

import BlogForm from './BlogForm';
import Blog from './Blog';
import Togglable from './Togglable';

const BlogsDisplay = () => {
  const blogs = useSelector(state => state.blogs);
  return (
    <div className='mt-3'>
      <h2>Blogs</h2>
      <ListGroup className='mt-3'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <ListGroup.Item key={blog.id}>
              <Blog blog={blog} />
            </ListGroup.Item>
          ))}
      </ListGroup>
      <Togglable className='mt-4' openLabel='New Blog' closeLabel='Cancel'>
        <BlogForm />
      </Togglable>
    </div>
  );
};

export default BlogsDisplay;
