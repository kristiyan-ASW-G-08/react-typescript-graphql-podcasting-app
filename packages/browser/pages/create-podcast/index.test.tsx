import React, { Children } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import UserEvent from '@testing-library/user-event';
import '../../importFontAwesome';
import createMockRouter from '../../testUtilities/createMockRouter';
import { createPodcastMutation } from '@/queries/podcastMutations';
import CreatePodcastPage from '.';
import { UserMutation } from '@/queries/userQueries';
import userEvent from '@testing-library/user-event';
import NotificationContext, {
  defaultNotification,
} from '@/context/NotificationContext';
import UploadButton from '@/components/UploacButton';

describe('CreatePodcastPage', () => {
  jest.setTimeout(30000);
  afterAll(() => jest.restoreAllMocks());
  it('it renders', async () => {
    const mockRouter = createMockRouter({});
    //assertions should be four/ waitFor bug
    expect.assertions(8);
    const title = 'passwordpassword';
    const website = 'https://mockWebsite.com';
    const file = new File(['imageFile'], 'values.jpg', {
      type: 'image/jpeg',
    });
    const credentials = [
      {
        value: title,
        placeholder: 'Title',
      },
      {
        value: website,
        placeholder: 'Website',
      },
      {
        value: website,
        placeholder: 'Website',
      },
    ];
    const mocks = [
      {
        request: {
          query: createPodcastMutation,
          variables: { title, website },
        },
        result: {
          data: {},
        },
      },
    ];
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <RouterContext.Provider value={mockRouter}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CreatePodcastPage />
        </MockedProvider>
      </RouterContext.Provider>,

      //@ts-ignore
    );

    credentials.forEach(({ value, placeholder }) => {
      const input = getByPlaceholderText(placeholder);
      UserEvent.type(input, value);
      waitFor(() => expect(input).toHaveAttribute('value', value));
    });
    expect(clickHandlerMock).toHaveBeenCalledTimes(1);
    const input = getByTestId('file-input');
    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });
    expect(getFileMock).toHaveBeenCalledTimes(1);
    expect(setFieldValue).toHaveBeenCalledWith('image', file);
    const submitButton = getByText('Create a Podcast');

    UserEvent.click(submitButton);
  });

  //   it('it renders and displays errors', async () => {
  //     //assertions should be 8
  //     expect.assertions(6);
  //     const password = '';
  //     const email = '';
  //     const credentials = [
  //       {
  //         value: email,
  //         placeholder: 'Email address',
  //         path: 'email',
  //       },
  //       {
  //         value: password,
  //         placeholder: 'Password',
  //         path: 'password',
  //       },
  //     ];
  //     const mocks = [
  //       {
  //         request: {
  //           query: UserMutation,
  //           variables: { email, password },
  //         },
  //       },
  //     ];
  //     const { getByText, getByPlaceholderText } = render(
  //       <RouterContext.Provider value={createMockRouter({})}>
  //         <MockedProvider mocks={mocks} addTypename={false}>
  //           <CreatePodcastPage />
  //         </MockedProvider>
  //       </RouterContext.Provider>,

  //       //@ts-ignore
  //     );

  //     credentials.forEach(({ value, placeholder, path }) => {
  //       const input = getByPlaceholderText(placeholder);
  //       UserEvent.type(input, value);
  //       waitFor(() => {
  //         expect(input).toHaveAttribute('value', value);
  //       });
  //       waitFor(() => {
  //         const errorLabel = getByText(`${path} is a required field`);
  //         expect(errorLabel).toBeInTheDocument();
  //       });
  //     });
  //   });

  //   it('it renders and display error message due to graphql validation errors', async () => {
  //     const password = 'passwordpassword';
  //     const email = 'testmail@test.test';
  //     const credentials = [
  //       {
  //         value: email,
  //         placeholder: 'Email address',
  //         path: 'email',
  //       },
  //       {
  //         value: password,
  //         placeholder: 'Password',
  //         path: 'password',
  //       },
  //     ];
  //     const mocks = [
  //       {
  //         error: {
  //           graphQLErrors: [
  //             {
  //               extensions: {
  //                 validationErrors: [
  //                   { path: 'email', message: 'email is a required field' },
  //                   { path: 'password', message: 'password is a required field' },
  //                 ],
  //               },
  //             },
  //           ],
  //         },
  //         request: {
  //           query: UserMutation,
  //           variables: { email, password },
  //         },
  //       },
  //     ];

  //     const setNotificationState = jest.fn();
  //     const { getByText, getByPlaceholderText, getByDisplayValue } = render(
  //       <NotificationContext.Provider value={setNotificationState}>
  //         <RouterContext.Provider value={createMockRouter({})}>
  //           {/*
  //  // @ts-ignore */}
  //           <MockedProvider mocks={mocks} addTypename={false}>
  //             <CreatePodcastPage />
  //           </MockedProvider>
  //         </RouterContext.Provider>
  //         ,
  //       </NotificationContext.Provider>,

  //       //@ts-ignore
  //     );

  //     credentials.forEach(({ value, placeholder }) => {
  //       const input = getByPlaceholderText(placeholder);
  //       UserEvent.type(input, value);
  //       waitFor(() => expect(input).toHaveAttribute('value', value));
  //     });
  //     userEvent.click(getByText('Login'));
  //     waitFor(() => {
  //       expect(setNotificationState).toBeCalledTimes(1);
  //     });
  //     waitFor(() => {
  //       expect(setNotificationState).toHaveBeenCalledWith(defaultNotification);
  //     });
  //     credentials.forEach(({ value, placeholder, path }) => {
  //       const input = getByPlaceholderText(placeholder);
  //       UserEvent.type(input, value);
  //       waitFor(() => {
  //         expect(input).toHaveAttribute('value', value);
  //       });
  //       waitFor(() => {
  //         const errorLabel = getByText(`${path} is a required field`);
  //         expect(errorLabel).toBeInTheDocument();
  //       });
  //     });
  //   });

  //   it('it renders and display error message due to graphql errors', async () => {
  //     const password = 'passwordpassword';
  //     const email = 'testmail@test.test';
  //     const credentials = [
  //       {
  //         value: email,
  //         placeholder: 'Email address',
  //       },
  //       {
  //         value: password,
  //         placeholder: 'Password',
  //       },
  //     ];
  //     const mocks = [
  //       {
  //         error: new Error('An error occurred'),
  //         request: {
  //           query: UserMutation,
  //           variables: { email, password },
  //         },
  //       },
  //     ];

  //     const setNotificationState = jest.fn();
  //     const { getByText, getByPlaceholderText, getByDisplayValue } = render(
  //       <NotificationContext.Provider value={setNotificationState}>
  //         <RouterContext.Provider value={createMockRouter({})}>
  //           {/* //@ts-ignore */}
  //           <MockedProvider mocks={mocks} addTypename={false}>
  //             <CreatePodcastPage />
  //           </MockedProvider>
  //         </RouterContext.Provider>
  //         ,
  //       </NotificationContext.Provider>,

  //       //@ts-ignore
  //     );

  //     credentials.forEach(({ value, placeholder }) => {
  //       const input = getByPlaceholderText(placeholder);
  //       UserEvent.type(input, value);
  //       waitFor(() => expect(input).toHaveAttribute('value', value));
  //     });

  //     userEvent.click(getByText('Sign Up'));
  //     waitFor(() => {
  //       expect(setNotificationState).toBeCalledTimes(1);
  //     });
  //     waitFor(() => {
  //       expect(setNotificationState).toHaveBeenCalledWith(defaultNotification);
  //     });
  //   });
});
function clickHandlerMock(clickHandlerMock: any) {
  throw new Error('Function not implemented.');
}

function imageInput(imageInput: any, arg1: { target: { files: any[] } }) {
  throw new Error('Function not implemented.');
}

function getFileMock(getFileMock: any) {
  throw new Error('Function not implemented.');
}

function setFieldValue(setFieldValue: any) {
  throw new Error('Function not implemented.');
}
