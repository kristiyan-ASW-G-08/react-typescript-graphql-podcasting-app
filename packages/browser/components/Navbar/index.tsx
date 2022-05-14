import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '@/components/Logo';
import styles from './index.module.scss';
import NavLink from '@/components/NavLink';
import MobileNavLink from '@/components/MobileNavLink';
import { tokenVar } from '../../variables';
import { useReactiveVar } from '@apollo/client';
import { defaultUserData, userDataVar } from '../../variables';

const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const token = useReactiveVar(tokenVar);
  console.log(token);
  const setDefaultUserData = () => {
    tokenVar('');
    userDataVar(defaultUserData);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <nav className={styles.navbar}>
          <ul>
            <NavLink fn={() => setIsActive(false)} href="/" text="Home" />
            {token ? (
              <>
                <NavLink
                  fn={() => setIsActive(false)}
                  href="/create-podcast"
                  text="New Podcast"
                />
                <NavLink
                  fn={() => setIsActive(false)}
                  href="/my-podcasts"
                  text="My Podcasts"
                />
                <NavLink
                  href="/"
                  fn={() => {
                    setIsActive(false);
                    setDefaultUserData();
                  }}
                  text="Logout"
                />
              </>
            ) : (
              <>
                <NavLink
                  fn={() => setIsActive(false)}
                  href="/sign-up"
                  text="Sign Up"
                />
                <NavLink
                  fn={() => setIsActive(false)}
                  href="/login"
                  text="Login"
                />
              </>
            )}
          </ul>
        </nav>
        <button
          onClick={() => setIsActive(!isActive)}
          className={styles.mobileNavButton}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
      </header>
      {isActive ? (
        <nav className={styles.mobileNav}>
          <ul>
            <MobileNavLink fn={() => setIsActive(false)} href="/" text="Home" />
            <MobileNavLink
              fn={() => setIsActive(false)}
              href="/sign-up"
              text="Podcasts"
            />
            {token ? (
              <>
                <MobileNavLink
                  fn={() => setIsActive(false)}
                  href="/create-podcast"
                  text="New Podcasts"
                />
                <MobileNavLink
                  fn={() => setIsActive(false)}
                  href="/my-podcasts"
                  text="My Podcasts"
                />
                <MobileNavLink
                  href="/"
                  fn={() => {
                    setIsActive(false);
                    setDefaultUserData();
                  }}
                  text="Logout"
                />
              </>
            ) : (
              <>
                <MobileNavLink
                  fn={() => setIsActive(false)}
                  href="/sign-up"
                  text="Sign Up"
                />
                <MobileNavLink
                  fn={() => setIsActive(false)}
                  href="/login"
                  text="Login"
                />
              </>
            )}
          </ul>
        </nav>
      ) : (
        ''
      )}
    </>
  );
};

export default Navbar;
