import Link from 'next/link';
import { FC } from 'react';
import styles from './index.module.scss';
import Podcast from 'types/Podcast';

const PodcastMiniCard: FC<Podcast> = ({ title, website, _id, cover }) => {
  return (
    <div className={styles.card}>
      <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${cover}`} alt="" />
      <h4>{title}</h4>
      <Link href={`/podcast/${_id}`}>
        <button>Learn More</button>
      </Link>
    </div>
  );
};
export default PodcastMiniCard;
