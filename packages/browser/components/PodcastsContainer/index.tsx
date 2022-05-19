import apolloClient from '../../apolloClient';
import { FC, useState } from 'react';
import getPodcastsQuery from '@/queries/getPodcasts';
import styles from './index.module.scss';
import PodcastMiniCard from '@/components/PodcastMiniCard';
import Podcast from '@/types/Podcast';

interface PodcastsContainerProps {
  podcasts: Podcast[];
}
const PodcastsContainer: FC<PodcastsContainerProps> = ({ podcasts }) => {
  return (
    <section className={styles.container}>
      <div data-testid="podcasts" className={styles.podcasts}>
        {podcasts.map(podcast => (
          <PodcastMiniCard
            data-testid={podcast._id}
            {...podcast}
            key={podcast._id}
          />
        ))}
      </div>
    </section>
  );
};

export default PodcastsContainer;
