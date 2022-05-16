import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { FC } from 'react';
import styles from './index.module.scss';
interface EpisodeProps {
  title: string;
  description: string;
  _id: string;
}
const Episode: FC<EpisodeProps> = ({ title, description, _id }) => {
  return (
    <article className={styles.episode}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={`/episode/${_id}`}>
        <button className={styles.playButton} type="button">
          Play Now
          <FontAwesomeIcon icon="play" className={styles.icon} />
        </button>
      </Link>
    </article>
  );
};

export default Episode;
