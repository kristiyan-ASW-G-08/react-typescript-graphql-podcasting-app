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
  console.log(episodes);
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    setUserId(userDataVar().userId);
  }, []);

  return (
    <>
      <HeadLayout title={title} />
      <div className={styles.container}>
        <PodcastCard
          title={title}
          website={website}
          cover={cover}
          user={user}
          _id={_id}
          userId={userId}
        />
        <div className={styles.episodeContainer}>
          {episodes.map(episode => (
            <Episode {...episode} key={episode._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { podcastId } = context.query;
  const podcastQuery = gql`
    query getPodcast($podcastId: ID!) {
      getPodcast(podcastId: $podcastId) {
        title
        website
        cover
        _id
        user {
          username
          _id
        }
      }
    }
  `;
  const {
    data: { getPodcast },
  } = await apolloClient.query({
    query: podcastQuery,
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
  console.log(getEpisodesByPodcast);
  return {
    props: {
      podcast: getPodcast,
      episodes: getEpisodesByPodcast.episodes,
    },
  };
}

export default Podcast;
