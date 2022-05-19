import React, { FC } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PodcastsContainer from '.';

describe('PodcastsContainer', () => {
  it('render PodcastsContainer', () => {
    const podcast = {
      title: 'SomeTItle',
      website: 'https://somewebsite.testit',
      cover: 'somecover.svg',
      user: {
        username: 'SomeUser',
        _id: 'someId',
      },
    };
    expect.assertions(2);
    const podcasts = [
      { ...podcast, _id: '1' },
      { ...podcast, _id: '2' },
      { ...podcast, _id: '3 ' },
      { ...podcast, _id: '4' },
      { ...podcast, _id: '5' },
      { ...podcast, _id: '6' },
      { ...podcast, _id: '7' },
      { ...podcast, _id: '8' },
    ];
    const { getByTestId } = render(<PodcastsContainer podcasts={podcasts} />);
    const podcastsContainer = getByTestId('podcasts');
    expect(podcastsContainer).toBeInTheDocument();
    waitFor(() => {
      expect(podcastsContainer.children.length).toEqual(podcasts.length);
    });
  });
});
