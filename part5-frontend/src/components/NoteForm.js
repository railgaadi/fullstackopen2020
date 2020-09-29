import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: false,
    });
    setNewNote('');
  };

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input id='newNote' value={newNote} onChange={handleChange} />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
