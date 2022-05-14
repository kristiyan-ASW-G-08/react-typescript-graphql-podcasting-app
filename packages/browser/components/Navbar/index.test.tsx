import React, { FC } from 'react';
import { render, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import createMockRouter from '../../testUtilities/createMockRouter';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '.';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { tokenVar } from '../../variables';

describe('Navbar', () => {
  it('render unauthenticated Navbar', () => {
    expect.assertions(7);
    const push = jest.fn();
    const links = [
      { text: 'Home', href: '/' },
      { text: 'Sign Up', href: '/sign-up' },
      { text: 'Login', href: '/login' },
    ];
    tokenVar('');
    const { container, getByText } = render(<Navbar />, {
      wrapper: ({ children }) => (
        <RouterContext.Provider value={createMockRouter({ push })}>
          <MockedProvider mocks={[]} addTypename={false}>
            {children}
          </MockedProvider>
        </RouterContext.Provider>
      ),
    });
    expect(container).toBeTruthy();
    links.forEach(({ text, href }) => {
      const link = getByText(text);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('render authenticated Navbar', () => {
    expect.assertions(9);
    const push = jest.fn();
    const links = [
      { text: 'Home', href: '/' },
      { text: 'Logout', href: '/' },
      { text: 'My Podcasts', href: '/my-podcasts' },
      { text: 'New Podcast', href: '/create-podcast' },
    ];
    tokenVar('someValidToken');
    const { container, getByText } = render(<Navbar />, {
      wrapper: ({ children }) => (
        <RouterContext.Provider value={createMockRouter({ push })}>
          <MockedProvider mocks={[]} addTypename={false}>
            {children}
          </MockedProvider>
        </RouterContext.Provider>
      ),
    });
    expect(container).toBeTruthy();
    links.forEach(({ text, href }) => {
      const link = getByText(text);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });
});
