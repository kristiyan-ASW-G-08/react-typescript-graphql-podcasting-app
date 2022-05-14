import React, { Children } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import UserEvent from '@testing-library/user-event';
import '../../importFontAwesome';
import createMockRouter from '../../testUtilities/createMockRouter';
import NotificationContext, {
  defaultNotification,
} from '@/context/NotificationContext';
import SignUpPage from '.';
import { UserMutation } from '@/queries/userQueries';
import userEvent from '@testing-library/user-event';

describe('SignUpPage', () => {
  jest.setTimeout(30000);
  afterAll(() => jest.restoreAllMocks());
  it('it renders', async () => {
    const password = 'passwordpassword';
    const username = 'newUsername';
    const email = 'testmail@test.test';
    const credentials = [
      { value: username, placeholder: 'Username' },
      {
        value: email,
        placeholder: 'Email address',
      },
      {
        value: password,
        placeholder: 'Password',
      },
      {
        value: password,
        placeholder: 'Repeat Password',
      },
    ];
    const mocks = [
      {
        request: {
          query: UserMutation,
          variables: { username, email, password, confirmPassword: password },
        },
        result: {
          data: {},
        },
      },
    ];
    const setNotificationState = jest.fn();
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <NotificationContext.Provider value={setNotificationState}>
        <RouterContext.Provider value={createMockRouter({})}>
          <MockedProvider mocks={mocks} addTypename={false}>
            <SignUpPage />
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

    userEvent.click(getByText('Sign Up'));
    waitFor(() => {
      expect(setNotificationState).toBeCalledTimes(1);
      expect(setNotificationState).toHaveBeenCalledWith({
        type: 'message',
        content: 'You can now log in!',
      });
    });
    waitFor(() => {
      expect(setNotificationState).toHaveBeenCalledWith({
        type: 'message',
        content: 'You can now log in!',
      });
    });
  });

  it('it renders and display error message due to graphql errors', async () => {
    const password = 'passwordpassword';
    const username = 'newUsername';
    const email = 'testmail@test.test';
    const credentials = [
      { value: username, placeholder: 'Username' },
      {
        value: email,
        placeholder: 'Email address',
      },
      {
        value: password,
        placeholder: 'Password',
      },
      {
        value: password,
        placeholder: 'Repeat Password',
      },
    ];
    const mocks = [
      {
        error: new Error('An error occurred'),
        request: {
          query: UserMutation,
          variables: { username, email, password, confirmPassword: password },
        },
      },
    ];

    const setNotificationState = jest.fn();
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <NotificationContext.Provider value={setNotificationState}>
        <RouterContext.Provider value={createMockRouter({})}>
          {/* //@ts-ignore */}
          <MockedProvider mocks={mocks} addTypename={false}>
            <SignUpPage />
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

    userEvent.click(getByText('Sign Up'));
    waitFor(() => {
      expect(setNotificationState).toBeCalledTimes(1);
    });
    waitFor(() => {
      expect(setNotificationState).toHaveBeenCalledWith(defaultNotification);
    });
  });

  it('it renders and display error message due to graphql validation errors', async () => {
    const password = 'passwordpassword';
    const username = 'newUsername';
    const email = 'testmail@test.test';
    const credentials = [
      { value: username, placeholder: 'Username', path: 'username' },
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
      {
        value: password,
        placeholder: 'Repeat Password',
        path: 'confirmPassword',
      },
    ];
    const mocks = [
      {
        error: {
          graphQLErrors: [
            {
              extensions: {
                validationErrors: [
                  { path: 'username', message: 'username is a required field' },
                  { path: 'email', message: 'email is a required field' },
                  { path: 'password', message: 'password is a required field' },
                  {
                    path: 'confirmPassword',
                    message: 'confirmPassword is a required field',
                  },
                ],
              },
            },
          ],
        },
        request: {
          query: UserMutation,
          variables: { username, email, password, confirmPassword: password },
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
            <SignUpPage />
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
    userEvent.click(getByText('Sign Up'));
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

  it('it renders and displays errors', async () => {
    const password = '';
    const username = '';
    const email = '';
    const credentials = [
      { value: username, placeholder: 'Username', path: username },
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
      {
        value: password,
        placeholder: 'Repeat Password',
        path: 'confirmPassword',
      },
    ];
    const mocks = [
      {
        request: {
          query: UserMutation,
          variables: { username, email, password, confirmPassword: password },
        },
      },
    ];
    const { getByText, getByPlaceholderText } = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SignUpPage />
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
});
