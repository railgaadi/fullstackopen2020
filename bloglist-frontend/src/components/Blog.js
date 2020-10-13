/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, loggedInUser, handleDelete }) => {
  const [details, setDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailStyle = { display: details ? '' : 'none' };

  const toggleDetails = () => {
    setDetails(!details);
  };

  const handleLikeClick = async () => {
    const result = await blogService.addLike(blog);
    setLikes(result);
  };

  const handleDeleteClick = async () => {
    handleDelete(blog);
  };

  return (
    <div style={blogStyle} className='blog-item'>
      <span>{blog.title}</span>
      <button className='detailsButton' onClick={toggleDetails}>
        {details ? 'hide' : 'show'}
      </button>
      <div style={detailStyle} className='details'>
        <ul>
          <li>Author: {blog.author}</li>
          <li>Url: {blog.url}</li>
          <li>User: {blog.user.username}</li>
          <li className='likes'>
            Likes: {likes}{' '}
            <button className='likeButton' onClick={handleLikeClick}>
              Like
            </button>
          </li>
          <li>
            {blog.user.username === loggedInUser ? (
              <button onClick={handleDeleteClick}>DELETE</button>
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Blog;
