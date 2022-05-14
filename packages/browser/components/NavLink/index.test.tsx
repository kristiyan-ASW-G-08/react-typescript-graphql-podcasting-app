import React, { FC } from 'react';
import { render, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import createMockRouter from '../../testUtilities/createMockRouter';
import '@testing-library/jest-dom/extend-expect';
import NavLink from '.';
import userEvent from '@testing-library/user-event';

describe('NavLink', () => {
  it('render NavLink', () => {
    expect.assertions(7);
    const fn = jest.fn();
    const href = 'http://fakehost';
    const text = 'text';
    const push = jest.fn();
    const { container, getByText } = render(
      <NavLink fn={fn} href={href} text={text} />,
      {
        wrapper: ({ children }) => (
          <RouterContext.Provider value={createMockRouter({ push })}>
            {children}
          </RouterContext.Provider>
        ),
      },
    );

    expect(container).toBeTruthy();
    const link = getByText(text);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', href);

    //@ts-ignore
    userEvent.click(link.parentElement);
    waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });
    waitFor(() => {
      expect(push).toHaveBeenCalledTimes(1);
    });
  });
});
