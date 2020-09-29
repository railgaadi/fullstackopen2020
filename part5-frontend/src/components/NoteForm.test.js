import React, { createContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './NoteForm';

test('NoteForm', () => {
  const createNote = jest.fn();

  const component = render(<NoteForm createNote={createNote} />);

  const input = component.container.querySelector('input');
  const form = component.container.querySelector('form');

  fireEvent.change(input, {
    target: { value: 'testing of forms can be easier' },
  });
  fireEvent.submit(form);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe(
    'testing of forms can be easier'
  );
});