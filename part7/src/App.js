import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';

// //REACT ROUTER

import {
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
);

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Login = (props) => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin('karan');
    history.push('/');
  };

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type='text' name='username' />
          <Form.Label>password:</Form.Label>
          <Form.Control type='password' />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ]);
  const [message, setMessage] = useState(null);

  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  const padding = {
    padding: 5,
  };

  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <div className='container'>
      {message && <Alert variant='success'>{message}</Alert>}
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>
                home
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/notes'>
                notes
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>
                users
              </Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              {user ? (
                <em>{user} logged in</em>
              ) : (
                <Link to='/login'>login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path='/notes/:id'>
          <Note note={note} />
        </Route>
        <Route path='/notes'>
          <Notes notes={notes} />
        </Route>
        <Route path='/users'>
          {user ? <Users /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login'>
          <Login onLogin={login} />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      <div>
        <br />
        <em>Note app, Helsinki FullStack2020</em>
      </div>
    </div>
  );
};

// //CUSTOM HOOKS

// const App = (props) => {
//   const useCounter = () => {
//     const [value, setValue] = useState(0);
//     const increase = () => setValue(value + 1);
//     const decrease = () => setValue(value - 1);
//     const zero = () => setValue(0);

//     return { value, increase, decrease, zero };
//   };

//   const counter = useCounter();
//   const left = useCounter();
//   const right = useCounter();

//   return (
//     <div>
//       <div>{counter.value}</div>
//       <button onClick={counter.increase}>plus</button>
//       <button onClick={counter.decrease}>minus</button>
//       <button onClick={counter.zero}>zero</button>
//       <br />
//       <br />
//       <div>Left:{left.value}</div>
//       <div>Right:{right.value}</div>
//       <button onClick={left.increase}>left</button>
//       <button onClick={right.increase}>right</button>
//     </div>
//   );
// };

// //CUSTOM HOOK - FORM

// const App = () => {
//   const useField = (type) => {
//     const [value, setValue] = useState('');
//     const onChange = (event) => {
//       setValue(event.target.value);
//     };
//     return { type, value, onChange };
//   };

//   const name = useField('text');
//   const born = useField('date');
//   const height = useField('number');

//   return (
//     <div>
//       <form>
//         name:
//         <input {...name} />
//         <br />
//         birthdate:
//         <input {...born} />
//         <br />
//         height:
//         <input {...height} />
//       </form>
//       <div>
//         {name.value} {born.value} {height.value}
//       </div>
//     </div>
//   );
// };

export default App;
