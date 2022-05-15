import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

interface MobileNavLinkProps {
  href: string;
  text: string;
  fn?: () => void;
}

const MobileNavLink: FC<MobileNavLinkProps> = ({
  href,
  text,
  fn = () => {},
}) => {
  const router = useRouter();
  return (
    <li onClick={fn} className={styles.linkItem}>
      <Link href={href}>
        <a
          className={[
            router.pathname === href ? styles.unactive : styles.active,
            styles.link,
          ].join(' ')}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};

export default MobileNavLink;
