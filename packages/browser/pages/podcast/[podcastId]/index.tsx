import { FC, useEffect, useState } from 'react';
import HeadLayout from '@/components/HeadLayout';
import Link from 'next/link';
import apolloClient from '../../../apolloClient';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { userDataVar } from 'variables';
import PodcastCard from '@/components/PodcastCard';
import Episode from '@/components/Episode';
import getPodcastQuery from '@/queries/getPodcastQuery';

interface EpisodeType {
  title: string;
  description: string;
  _id: string;
}
interface PodcastProps {
  podcast: {
    title: string;
    website: string;
    cover: string;
    _id: string;
    user: {
      username: string;
      _id: string;
    };
  };
  episodes: EpisodeType[];
}

const Podcast: FC<PodcastProps> = ({
  podcast: { title, website, cover, _id, user },
  episodes,
}) => {
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    if (userDataVar().userId) {
      setUserId(userDataVar().userId);
    }
  }, []);

  return (
    <>
      <HeadLayout title={title} />
      <div className={styles.container}>
        <div>
          <PodcastCard
            title={title}
            website={website}
            cover={cover}
            user={user}
            _id={_id}
            userId={userId}
          />
        </div>

        {episodes.length === 0 ? (
          <p>No Episodes Found</p>
        ) : (
          <div className={styles.episodeContainer}>
            {episodes.map(episode => (
              <Episode {...episode} key={episode._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { podcastId } = context.query;

  const {
    data: { getPodcast },
  } = await apolloClient.query({
    query: getPodcastQuery,
    variables: { podcastId },
  });

  const episodesQuery = gql`
    query getEpisodesByPodcast($podcastId: ID!) {
      getEpisodesByPodcast(podcastId: $podcastId) {
        episodes {
          title
          description
          _id
        }
      }
    }
  `;
  const {
    data: { getEpisodesByPodcast },
  } = await apolloClient.query({
    query: episodesQuery,
    variables: { podcastId },
  });
  return {
    props: {
      podcast: getPodcast,
      episodes: getEpisodesByPodcast.episodes,
    },
  };
}

export default Podcast;
