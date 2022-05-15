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
  const setDefaultUserData = () => {
    tokenVar('');
    userDataVar(defaultUserData);
  };
  const setMobileNavState = () => {
    console.timeLog('Avc');
    setIsActive(prev => !prev);
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <nav className={styles.navbar}>
          <ul>
            <NavLink href="/" text="Home" />
            {token ? (
              <>
                <NavLink href="/create-podcast" text="New Podcast" />
                <NavLink href="/my-podcasts" text="My Podcasts" />
                <NavLink
                  href="/"
                  fn={() => {
                    setIsActive(prev => !prev);
                    setDefaultUserData();
                  }}
                  text="Logout"
                />
              </>
            ) : (
              <>
                <NavLink href="/sign-up" text="Sign Up" />
                <NavLink href="/login" text="Login" />
              </>
            )}
          </ul>
        </nav>
        <button onClick={setMobileNavState} className={styles.mobileNavButton}>
          <FontAwesomeIcon icon="bars" />
        </button>
      </header>
      {isActive ? (
        <nav className={styles.mobileNav}>
          <ul>
            <MobileNavLink fn={setMobileNavState} href="/" text="Home" />
            <MobileNavLink
              fn={setMobileNavState}
              href="/sign-up"
              text="Podcasts"
            />
            {token ? (
              <>
                <MobileNavLink
                  fn={setMobileNavState}
                  href="/create-podcast"
                  text="New Podcasts"
                />
                <MobileNavLink
                  fn={setMobileNavState}
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
                  fn={setMobileNavState}
                  href="/sign-up"
                  text="Sign Up"
                />
                <MobileNavLink
                  fn={setMobileNavState}
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
