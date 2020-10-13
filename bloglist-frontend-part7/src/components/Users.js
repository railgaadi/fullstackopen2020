import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Table } from 'react-bootstrap';

const Users = () => {
  const state = useSelector(state => state.blogs);
  const mappedState = state.map(blog => {
    return {
      blog: {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog.id,
      },
      user: blog.user,
    };
  });

  const collection = mappedState.reduce((result, current) => {
    const found = result.find(e => e.user.id === current.user.id);
    if (found) {
      found.blogs.push(current.blog);
    } else result.push({ blogs: [current.blog], user: current.user });
    return result;
  }, []);

  return (
    <div className='mt-3'>
      <h2>Users</h2>
      <Table striped className='mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Blogs</th>
          </tr>
        </thead>
        <tbody>
          {collection.map(e => (
            <tr key={e.user.id}>
              <td>
                <Link to={`/users/${e.user.id}`}>{e.user.name}</Link>
              </td>
              <td>{e.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
