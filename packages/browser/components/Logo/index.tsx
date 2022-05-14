import Image from 'next/image';
import styles from './index.module.scss';
import logo from '../../assets/logo-default.svg';

const Logo = () => (
  <div className={styles.logoContainer}>
    <Image
      src={logo ? logo : ''}
      height={20}
      width={40}
      alt="PodCasting Logo"
    />
    <h1>PodCaster</h1>
  </div>
);

export default Logo;
