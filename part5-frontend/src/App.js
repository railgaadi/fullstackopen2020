import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (credentialsObj) => {
    try {
      const user = await loginService.login(credentialsObj);

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));

      noteService.setToken(user.token);

      setUser(user);

      console.log(user);
    } catch (error) {
      setErrorMessage(`Wrong credentials`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm attemptLogin={handleLogin} />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel='add new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  const rows = () => (
    <ul>
      {notesToShow.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
        />
      ))}
    </ul>
  );

  return (
    <div>
      <Notification message={errorMessage} />
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'important' : 'show all'}
      </button>
      {rows()}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged in</p>
          {noteForm()}
        </div>
      )}
    </div>
  );
};

export default App;
