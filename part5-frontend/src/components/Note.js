import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'Not Important' : 'Important';
  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggleImportance}> {label}</button>
    </li>
  );
};

export default Note;
