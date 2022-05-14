import { FC } from 'react';
import styles from './index.module.scss';
import { Notification as NotificationProps } from '../../context/NotificationContext';

const Notification: FC<NotificationProps> = ({ content, type }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.notification} ${
          type === 'warning' ? styles.warning : styles.message
        }`}
      >
        {content}
      </p>
    </div>
  );
};

export default Notification;
