import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

interface NavLinkProps {
  href: string;
  text: string;
  fn?: () => void;
}

const NavLink: FC<NavLinkProps> = ({ href, text, fn = () => {} }) => {
  const router = useRouter();

  return (
    <li className={styles.linkItem}>
      <Link href={href}>
        <a
          onClick={fn}
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

export default NavLink;
