import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            type='text'
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            onChange={({ target }) => setUrl(target.value)}
            value={url}
          />
        </div>
        <button id='submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
