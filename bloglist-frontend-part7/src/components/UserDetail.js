import React from 'react';

import { ListGroup } from 'react-bootstrap';

const UserDetail = ({ userBlogs }) => {
  const user = userBlogs[0]?.user;
  if (!user) {
    return null;
  }
  return (
    <div>
      <h3 className='mt-4 mb-3'>Blogs by {user.name}</h3>
      <ListGroup>
        {userBlogs.map(blog => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default UserDetail;
