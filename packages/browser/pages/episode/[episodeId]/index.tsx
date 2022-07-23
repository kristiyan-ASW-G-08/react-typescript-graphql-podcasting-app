import { FC, useEffect, useState } from 'react';
import HeadLayout from '@/components/HeadLayout';
import Link from 'next/link';
import apolloClient from '../../../apolloClient';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { userDataVar } from 'variables';
import AudioPlayer from 'components/AudioPlayer';

interface EpisodeProps {
  episode: {
    title: string;
    description: string;
    audioFile: string;
    _id: string;
    date: string;
    podcast: {
      cover: string;
    };
  };
}

const Episode: FC<EpisodeProps> = ({
  episode: {
    title,
    description,
    audioFile,
    date,
    _id,
    podcast: { cover },
  },
}) => {
  const [userId, setUserId] = useState<string>('');
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  useEffect(() => {
    setShowPlayer(true);
    if (userDataVar().userId) {
      setUserId(userDataVar().userId);
    }
  }, []);

  return (
    <>
      <HeadLayout title={title} />
      <div className={styles.container}>
        <article className={styles.contentContainer}>
          <h1>{title}</h1>
          <p>{description}</p>
        </article>

        {typeof window !== 'undefined' && showPlayer ? (
          <AudioPlayer
            fixed={true}
            audioSrc={`${process.env.NEXT_PUBLIC_SERVER_URL}/${audioFile}`}
            coverSrc={`${process.env.NEXT_PUBLIC_SERVER_URL}/${cover}`}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { episodeId } = context.query;
  const query = gql`
    query getEpisode($episodeId: ID!) {
      getEpisode(episodeId: $episodeId) {
        title
        description
        audioFile
        date
        podcast {
          title
          cover
        }
        _id
      }
    }
  `;
  const {
    data: { getEpisode },
  } = await apolloClient.query({
    query,
    variables: { episodeId },
  });
  return {
    props: {
      episode: getEpisode,
    },
  };
}

export default Episode;
