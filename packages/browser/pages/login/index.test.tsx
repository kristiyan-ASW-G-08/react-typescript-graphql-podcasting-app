import React, { Children } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import UserEvent from '@testing-library/user-event';
import '../../importFontAwesome';
import createMockRouter from '../../testUtilities/createMockRouter';

import LoginPage from '.';
import { UserMutation } from '@/queries/userQueries';
import userEvent from '@testing-library/user-event';
import NotificationContext, {
  defaultNotification,
} from '@/context/NotificationContext';

describe('LoginPage', () => {
  jest.setTimeout(30000);
  afterAll(() => jest.restoreAllMocks());
  it('it renders', async () => {
    const mockRouter = createMockRouter({});
    //assertions should be four/ waitFor bug
    expect.assertions(8);
    const password = 'passwordpassword';
    const email = 'testmail@test.test';
    const credentials = [
      {
        value: email,
        placeholder: 'Email address',
      },
      {
        value: password,
        placeholder: 'Password',
      },
    ];
    const mocks = [
      {
        request: {
          query: UserMutation,
          variables: { email, password },
        },
        result: {
          data: {},
        },
      },
    ];
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <RouterContext.Provider value={mockRouter}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <LoginPage />
        </MockedProvider>
      </RouterContext.Provider>,

      //@ts-ignore
    );

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      waitFor(() => expect(input).toHaveAttribute('value', value));
    });

    const submitButton = getByText('Login');

    UserEvent.click(submitButton);
  });

  it('it renders and displays errors', async () => {
    //assertions should be 8
    expect.assertions(6);
    const password = '';
    const email = '';
    const credentials = [
      {
        value: email,
        placeholder: 'Email address',
        path: 'email',
      },
      {
        value: password,
        placeholder: 'Password',
        path: 'password',
      },
    ];
    const mocks = [
      {
        request: {
          query: UserMutation,
          variables: { email, password },
        },
      },
    ];
    const { getByText, getByPlaceholderText } = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <LoginPage />
        </MockedProvider>
      </RouterContext.Provider>,

      //@ts-ignore
    );

    credentials.forEach(({ value, placeholder, path }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      waitFor(() => {
        expect(input).toHaveAttribute('value', value);
      });
      waitFor(() => {
        const errorLabel = getByText(`${path} is a required field`);
        expect(errorLabel).toBeInTheDocument();
      });
    });
  });

  it('it renders and display error message due to graphql validation errors', async () => {
    const password = 'passwordpassword';
    const email = 'testmail@test.test';
    const credentials = [
      {
        value: email,
        placeholder: 'Email address',
        path: 'email',
      },
      {
        value: password,
        placeholder: 'Password',
        path: 'password',
      },
    ];
    const mocks = [
      {
        error: {
          graphQLErrors: [
            {
              extensions: {
                validationErrors: [
                  { path: 'email', message: 'email is a required field' },
                  { path: 'password', message: 'password is a required field' },
                ],
              },
            },
          ],
        },
        request: {
          query: UserMutation,
          variables: { email, password },
        },
      },
    ];

    const setNotificationState = jest.fn();
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <NotificationContext.Provider value={setNotificationState}>
        <RouterContext.Provider value={createMockRouter({})}>
          {/*
 // @ts-ignore */}
          <MockedProvider mocks={mocks} addTypename={false}>
            <LoginPage />
          </MockedProvider>
        </RouterContext.Provider>
        ,
      </NotificationContext.Provider>,

      //@ts-ignore
    );

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      waitFor(() => expect(input).toHaveAttribute('value', value));
    });
    userEvent.click(getByText('Login'));
    waitFor(() => {
      expect(setNotificationState).toBeCalledTimes(1);
    });
    waitFor(() => {
      expect(setNotificationState).toHaveBeenCalledWith(defaultNotification);
    });
    credentials.forEach(({ value, placeholder, path }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      waitFor(() => {
        expect(input).toHaveAttribute('value', value);
      });
      waitFor(() => {
        const errorLabel = getByText(`${path} is a required field`);
        expect(errorLabel).toBeInTheDocument();
      });
    });
  });

  it('it renders and display error message due to graphql errors', async () => {
    const password = 'passwordpassword';
    const email = 'testmail@test.test';
    const credentials = [
      {
        value: email,
        placeholder: 'Email address',
      },
      {
        value: password,
        placeholder: 'Password',
      },
    ];
    const mocks = [
      {
        error: new Error('An error occurred'),
        request: {
          query: UserMutation,
          variables: { email, password },
        },
      },
    ];

    const setNotificationState = jest.fn();
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <NotificationContext.Provider value={setNotificationState}>
        <RouterContext.Provider value={createMockRouter({})}>
          {/* //@ts-ignore */}
          <MockedProvider mocks={mocks} addTypename={false}>
            <LoginPage />
          </MockedProvider>
        </RouterContext.Provider>
        ,
      </NotificationContext.Provider>,

      //@ts-ignore
    );

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      waitFor(() => expect(input).toHaveAttribute('value', value));
    });

    userEvent.click(getByText('Login'));
    waitFor(() => {
      expect(setNotificationState).toBeCalledTimes(1);
    });
    waitFor(() => {
      expect(setNotificationState).toHaveBeenCalledWith(defaultNotification);
    });
  });
});
