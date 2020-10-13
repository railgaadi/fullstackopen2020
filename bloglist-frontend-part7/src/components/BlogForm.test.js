import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import BlogForm from './BlogForm';

test('event handler called on submit', () => {
  const mockHandler = jest.fn();
  const component = render(<BlogForm createBlog={mockHandler} />);
  const author = component.container.querySelector('#author');
  const title = component.container.querySelector('#title');
  const url = component.container.querySelector('#url');
  fireEvent.change(author, { target: { value: 'Someone' } });
  fireEvent.change(title, { target: { value: 'Something' } });
  fireEvent.change(url, { target: { value: 'Somewhere' } });
  fireEvent.click(submit);
  expect(mockHandler).toHaveBeenCalledWith({
    author: 'Someone',
    title: 'Something',
    url: 'Somewhere',
  });
});
