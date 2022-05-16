import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'apolloClient';
import dynamic from 'next/dynamic';
import '../styles/globals.scss';
import '../importFontAwesome';
import NotificationContext from 'context/NotificationContext';

import Notification from '@/components/Notification';
import {
  Notification as NotificationType,
  defaultNotification,
} from 'context/NotificationContext';
import { useState } from 'react';
import Footer from 'components/Footer';
import styles from './index.module.scss';
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  const [notification, setNotification] = useState<NotificationType | null>();
  const setNotificationState = (
    notification: NotificationType = defaultNotification,
  ) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };
  return (
    <ApolloProvider client={apolloClient}>
      <NotificationContext.Provider value={setNotificationState}>
        {notification ? (
          <Notification
            content={notification.content}
            type={notification.type}
          />
        ) : (
          ''
        )}

        <Navbar />
        <div className={styles.layout}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </NotificationContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
