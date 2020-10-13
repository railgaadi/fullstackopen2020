import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className='blog-item'>
      <span>
        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </span>
    </div>
  );
};

export default Blog;
