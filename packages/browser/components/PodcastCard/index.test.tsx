import React, { FC } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PodcastCard from '.';

describe('PodcastCard', () => {
  it('render PodcastCard with non matching user', () => {
    const podcast = {
      title: 'SomeTItle',
      website: 'https://somewebsite.testit',
      cover: 'somecover.svg',
      user: {
        username: 'SomeUser',
        _id: 'someId',
      },
      userId: 'someOtherId',
      _id: '1',
    };
    expect.assertions(3);

    const { container, getByTestId, queryByText } = render(
      <PodcastCard {...podcast} />,
    );
    expect(container).toMatchSnapshot();

    const createButton = queryByText('Create An Episode');
    const editButton = queryByText('Edit');

    expect(createButton).not.toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });

  it('render PodcastCard with matching user', () => {
    const podcast = {
      title: 'SomeTItle',
      website: 'https://somewebsite.testit',
      cover: 'somecover.svg',
      user: {
        username: 'SomeUser',
        _id: 'someId',
      },
      userId: 'someId',
      _id: '1',
    };
    expect.assertions(3);

    const { container, getByTestId } = render(<PodcastCard {...podcast} />);

    expect(container).toMatchSnapshot();

    const createButton = getByTestId('create');
    const editButton = getByTestId('edit');

    expect(createButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });
});
