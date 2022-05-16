import styles from './index.module.scss';
import Logo from 'components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = () => (
  <footer className={styles.footer}>
    <Logo />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.{' '}
    </p>
    <div className={styles.mediaContainer}>
      <FontAwesomeIcon
        icon={['fab', 'facebook']}
        className={styles.mediaIcon}
        bounce
      />
      <FontAwesomeIcon
        icon={['fab', 'instagram']}
        className={styles.mediaIcon}
        bounce
      />
      <FontAwesomeIcon
        icon={['fab', 'twitter']}
        className={styles.mediaIcon}
        bounce
      />
      <FontAwesomeIcon
        icon={['fab', 'youtube']}
        className={styles.mediaIcon}
        bounce
      />
    </div>
  </footer>
);

export default Footer;
