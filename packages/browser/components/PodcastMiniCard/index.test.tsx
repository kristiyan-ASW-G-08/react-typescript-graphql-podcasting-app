import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PodcastMiniCard from '.';
import Podcast from '@/pages/podcast/[podcastId]';

describe('PodcastMiniCard', () => {
  it('render PodcastMiniCard', () => {
    expect.assertions(2);
    const podcast = {
      title: 'SomeTItle',
      website: 'https://somewebsite.testit',
      cover: 'somecover.svg',
      user: {
        username: 'SomeUser',
        _id: 'someId',
      },
      _id: '1',
    };

    const { container } = render(<PodcastMiniCard {...podcast} />);

    expect(container).toBeTruthy;
    expect(container).toMatchSnapshot();
  });
});
