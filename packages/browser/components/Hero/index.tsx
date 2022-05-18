import Link from 'next/link';
import { FC } from 'react';
import { tokenVar } from 'variables';
import styles from './index.module.scss';

const Hero: FC = () => {
  const token = tokenVar();
  return (
    <div className={styles.heroContainer}>
      <div className={styles.backdrop}>
        <h1>
          The Place to <span>Find</span> and <span>Create</span> Podcasts
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,<wbr></wbr>{' '}
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
        </p>
        <div className={styles.buttonContainer}>
          {token ? (
            <Link href="/create-podcast">
              <a className={styles.primaryButton}>Create a Podcast</a>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <a className={styles.opaqueButton}>Log In</a>
              </Link>
              <Link href="/sign-up">
                <a className={styles.primaryButton}>Sign Up</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
