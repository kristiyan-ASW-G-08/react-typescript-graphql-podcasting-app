import Link from 'next/link';
import { FC } from 'react';
import styles from './index.module.scss';

interface PodcastProps {
  title: string;
  website: string;
  cover: string;
  _id: string;
  userId: string;
  user: {
    username: string;
    _id: string;
  };
}

const PodcastCard: FC<PodcastProps> = ({
  title,
  user,
  website,
  _id,
  cover,
  userId,
}) => {
  return (
    <div className={styles.card}>
      <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${cover}`} />
      <h1>{title}</h1>
      <h2>{user.username}</h2>
      <div className={styles.buttonContainer}>
        {userId === user._id ? (
          <>
            <Link href={`/podcast/edit/${_id}`}>
              <button data-testid="edit">Edit</button>
            </Link>
            <Link href={`/create-episode/${_id}`}>
              <button data-testid="create">Create An Episode</button>
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
  );
};
export default PodcastCard;
