import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from '.';
import createMockRouter from 'testUtilities/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import userEvent from '@testing-library/user-event';
describe('Episode', () => {
  it('render Episode', () => {
    expect.assertions(4);
    const episode = {
      title: 'SomeTitle',
      description: 'someDescription',
      _id: '1',
    };
    const push = jest.fn();
    const { container, getByText } = render(<Episode {...episode} />, {
      wrapper: ({ children }) => (
        <RouterContext.Provider value={createMockRouter({ push })}>
          {children}
        </RouterContext.Provider>
      ),
    });

    expect(container).toBeTruthy;
    expect(container).toMatchSnapshot();

    const link = getByText('Play Now');

    userEvent.click(link);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(`/episode/${episode._id}`);
  });
});
