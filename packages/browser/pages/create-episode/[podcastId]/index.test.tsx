import React, { Children } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import UserEvent from '@testing-library/user-event';
import '../../importFontAwesome';
import createMockRouter from '../../../testUtilities/createMockRouter';
import { createPodcastMutation } from '@/queries/podcastMutations';
import CreatePodcastPage from '.';
import { UserMutation } from '@/queries/userQueries';
import userEvent from '@testing-library/user-event';
import NotificationContext, {
  defaultNotification,
} from '@/context/NotificationContext';
import UploadButton from '@/components/UploadButton';
import { createEpisodeMutation } from '@/queries/episodeMutations';

describe('CreatePodcastPage', () => {
  jest.setTimeout(30000);
  afterAll(() => jest.restoreAllMocks());
  global.URL.createObjectURL = jest.fn();
  it('it renders', async () => {
    const mockRouter = createMockRouter({});
    //assertions should be four/ waitFor bug
    expect.assertions(6);
    const title = 'passwordpassword';
    const description = 'description';
    const file = new File(['audiofile'], 'values.mp4', {
      type: 'image/jpeg',
    });
    const credentials = [
      {
        value: title,
        placeholder: 'Title',
      },
      {
        value: description,
        placeholder: 'Description',
      },
    ];
    const mocks = [
      {
        request: {
          query: createEpisodeMutation,
          variables: { title, description },
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
    const input = getByTestId('file-input');
    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });
    const submitButton = getByText('Create a Podcast');

    UserEvent.click(submitButton);
  });
});
