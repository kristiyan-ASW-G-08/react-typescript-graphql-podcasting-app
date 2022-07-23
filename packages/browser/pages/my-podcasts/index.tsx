import { FC, useEffect, useState } from 'react';
import HeadLayout from '@/components/HeadLayout';
import apolloClient from 'apolloClient';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.scss';
import { userDataVar } from 'variables';
import AudioPlayer from 'components/AudioPlayer';
import getPodcastsQuery from '@/queries/getPodcasts';
import Podcast from '@/types/Podcast';
import PodcastsContainer from '@/components/PodcastsContainer';
import usePodcasts from 'hooks/usePodcasts';
interface PodcastsProps {
  podcasts: Podcast[];
}

const Podcasts: FC<PodcastsProps> = ({ podcasts }) => {
  const {currentPodcasts, loadNextPage} = usePodcasts(podcasts);

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionHeadline}>My Podcasts</h3>
      <PodcastsContainer podcasts={currentPodcasts} />

      <button onClick={loadNextPage}>Load More</button>
    </div>
  );
};

export async function getServerSideProps() {
  const {
    data: { getPodcasts },
  } = await apolloClient.query({
    query: getPodcastsQuery,
    variables: { page: 1, limit: 10, userId: userDataVar().userId },
  });
  console.log(getPodcasts);
  return {
    props: {
      podcasts: getPodcasts.podcasts,
    },
  };
}
export default Podcasts;
