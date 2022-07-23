import usePodcasts from 'hooks/usePodcasts';
import apolloClient from '../../apolloClient';
import { useQuery, QueryResult } from '@apollo/client';
import React from 'react';
import { renderHook } from '@testing-library/react';
const newPodcasts = [
  {
    title: 'Second',
    website: '',
    cover: '',
    user: {
      username: '',
      _id: '',
    },
    _id: '',
  },
];
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest
    .fn()
    .mockReturnValue({ data: { getPodcasts: { podcasts: newPodcasts } } }),
}));

describe('usePodcasts', () => {
  const podcasts = [
    {
      title: 'First',
      website: '',
      cover: '',
      user: {
        username: '',
        _id: '',
      },
      _id: '',
    },
  ];

  it('calls apolloClient', () => {
    //@ts-ignore
    const { loadNextPage, currentPage, currentPodcasts } = renderHook(() =>
      usePodcasts(podcasts),
    ).result.current;
    loadNextPage();
    expect(useQuery).toHaveBeenCalledTimes(1);
    expect(useQuery).toHaveReturnedWith({
      data: { getPodcasts: { podcasts: newPodcasts } },
    });
  });
});
