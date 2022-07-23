import { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import HeadLayout from '@/components/HeadLayout';
import PodcastsContainer from '@/components/PodcastsContainer';
import apolloClient from 'apolloClient';
import getPodcastsQuery from '@/queries/getPodcasts';
import { useState } from 'react';
import Podcast from '@/types/Podcast';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/SearchBar';
import usePodcasts from 'hooks/usePodcasts';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

interface HomerProps {
  podcasts: Podcast[];
}
const Home: NextPage<HomerProps> = ({ podcasts }) => {
  const maxPage = 3;
  const { currentPodcasts, loadNextPage,currentPage } = usePodcasts(podcasts);
  return (
    <>
      <HeadLayout
        title="Home"
        description="PodCaster is a simple podcast hosting application"
        keywords="PodCaster, podcasts,  podcasting"
      />
      <Hero />
      <SearchBar />
      <div className={styles.container}>
        <h3 className={styles.sectionHeadline}>Podcasts</h3>
        <PodcastsContainer podcasts={currentPodcasts} />
        {currentPage >= maxPage ? (
          <Link href={'/podcasts'}>
            <button>View More</button>
          </Link>
        ) : (
          <button onClick={loadNextPage}>Load More</button>
        )}
      </div>
    </>
  );
};
export async function getServerSideProps() {
  const {
    data: { getPodcasts },
  } = await apolloClient.query({
    query: getPodcastsQuery,
    variables: { page: 1, limit: 10 },
  });
  return {
    props: {
      podcasts: getPodcasts.podcasts,
    },
  };
}

export default Home;
