import { FC, useEffect, useState } from 'react';
import HeadLayout from '@/components/HeadLayout';
import Link from 'next/link';
import apolloClient from '../../../apolloClient';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { userDataVar } from 'variables';

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
}

const Podcast: FC<PodcastProps> = ({
  podcast: { title, website, cover, _id, user },
}) => {
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    setUserId(userDataVar().userId);
  }, []);

  return (
    <>
      <HeadLayout title={'Podcast'} />
      <div className={styles.container}>
        <div className={styles.card}>
          <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${cover}`} />
          <h1>{title}</h1>
          <h2>{user.username}</h2>
          <div className={styles.buttonContainer}>
            {userId === user._id ? (
              <>
                <Link href={website}>
                  <button>Edit</button>
                </Link>
                <Link href={`/create-episode/${_id}`}>
                  <button>Create An Episode</button>
                </Link>
              </>
            ) : (
              ''
            )}
            <Link href={website}>
              <button>Website</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { podcastId } = context.query;
  const query = gql`
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
    query,
    variables: { podcastId },
  });
  return {
    props: {
      podcast: getPodcast,
    },
  };
}

export default Podcast;
