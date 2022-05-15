import { FC } from 'react';
import HeadLayout from '@/components/HeadLayout';
import Link from 'next/link';
import styles from '../styles/404.module.scss';

const NotFound: FC = () => (
  <>
    <HeadLayout title={'404 Not Found'} />
    <div className={styles.container}>
      <div>
        <div className={styles.notFound}>404</div>
        <Link href="/">
          <a className={styles.link}>Go Home</a>
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
