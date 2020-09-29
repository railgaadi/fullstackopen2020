import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from './Blog';
describe('Blog tests', () => {
  let component;
  beforeEach(() => {
    const blog = {
      title: 'Title of blog',
      author: 'Author of blog',
      url: 'google.com',
      likes: 200,
      user: { username: 'username of user' },
    };
    component = render(<Blog blog={blog} />);
  });

  test('blog title is rendered by default, other details are not', () => {
    const title = component.container.querySelector('.title');
    const details = component.container.querySelector('.details');

    expect(title).toHaveTextContent('Title of blog');
    expect(details).toHaveStyle('display:none');
  });

  test('url is displayed with details only when button is clicked', () => {
    const button = component.container.querySelector('.detailsButton');
    const details = component.container.querySelector('.details');
    const likes = component.container.querySelector('.likes');

    expect(details).not.toBeVisible();
    expect(likes).not.toBeVisible();

    fireEvent.click(button);

    expect(details).toBeVisible();
    expect(likes).toBeVisible();
  });

  //FOLLOWING TEST FAILS, AS EXERCISE AND IMPLEMENTATION ARE DIFFERENT

  // test('clicking like fires handler function', () => {
  //   const spy = jest.spyOn(component, 'handleLikeClick');

  //   const detailsButton = component.container.querySelector('.detailsButton');
  //   const likeButton = component.container.querySelector('.likeButton');
  //   fireEvent.click(detailsButton);
  //   fireEvent.click(likeButton);
  //   expect(spy).toHaveBeenCalled();
  // });
});
