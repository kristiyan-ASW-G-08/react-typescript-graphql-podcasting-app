import getPodcastsQuery from '@/queries/getPodcasts';
import Podcast from '@/types/Podcast';
import apolloClient from '../apolloClient';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

const usePodcasts = (
  podcasts: Podcast[],
): {
  currentPodcasts: Podcast[];
  loadNextPage: () => void;
  currentPage: number;
} => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPodcasts, setCurrentPodcasts] = useState<Podcast[]>(podcasts);
  const loadNextPage = async () => {
    const { loading, error, data:{getPodcasts} } = useQuery(getPodcastsQuery, {
        variables: { page: currentPage + 1, limit: 10 }
  })
    setCurrentPage(prev => prev + 1);
    setCurrentPodcasts([...currentPodcasts, ...getPodcasts.podcasts]);
  };

  return { currentPodcasts, loadNextPage, currentPage };
};

export default usePodcasts;
