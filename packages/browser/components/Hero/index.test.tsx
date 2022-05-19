import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hero from '.';
import createMockRouter from 'testUtilities/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import userEvent from '@testing-library/user-event';
import { tokenVar } from 'variables';
import { MockedProvider } from '@apollo/client/testing';
describe('Hero', () => {
  it('render unauthenticated Hero', () => {
    tokenVar('');
    expect.assertions(5);
    const push = jest.fn();
    const { container, getByText } = render(<Hero />, {
      wrapper: ({ children }) => (
        <RouterContext.Provider value={createMockRouter({ push })}>
          <MockedProvider mocks={[]} addTypename={false}>
            {children}
          </MockedProvider>
        </RouterContext.Provider>
      ),
    });

    expect(container).toBeTruthy;
    expect(container).toMatchSnapshot();

    const loginButton = getByText('Log In');
    const signUpButton = getByText('Sign Up');
    userEvent.click(loginButton);
    userEvent.click(signUpButton);
    expect(push).toHaveBeenCalledTimes(2);
    expect(push).toHaveBeenNthCalledWith(1, '/login');
    expect(push).toHaveBeenNthCalledWith(2, '/sign-up');
  });

  it('render authenticated Hero', () => {
    tokenVar('someToken');
    expect.assertions(4);
    const push = jest.fn();
    const { container, getByText } = render(<Hero />, {
      wrapper: ({ children }) => (
        <RouterContext.Provider value={createMockRouter({ push })}>
          <MockedProvider mocks={[]} addTypename={false}>
            {children}
          </MockedProvider>
        </RouterContext.Provider>
      ),
    });

    expect(container).toBeTruthy;
    expect(container).toMatchSnapshot();

    const createPodcastButton = getByText('Create a Podcast');
    userEvent.click(createPodcastButton);
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/create-podcast');
  });
});
