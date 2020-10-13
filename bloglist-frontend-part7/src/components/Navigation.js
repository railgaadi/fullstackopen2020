import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Info from './Info';

const Navigation = ({ user }) => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#'>
            <Link to='/'>Home</Link>
          </Nav.Link>
          <Nav.Link href='#'>
            <Link to='/users'>Users</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Info user={user} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
