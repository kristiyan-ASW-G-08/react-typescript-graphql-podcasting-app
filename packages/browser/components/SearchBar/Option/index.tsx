import Link from 'next/link';
import { FC } from 'react';
import styles from './index.module.scss';

interface OptionProps {
  title: string;
  cover: string;
  _id: string;
}
const Option: FC<OptionProps> = ({ title, cover, _id }) => {
  return (
    <li className={styles.option}>
      <Link
        href={`/podcast/${_id}`}
        onClick={() => {

        }}
      >
        <a>
          <p>{title}</p>
          <img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${cover}`}
            alt={`${title} cover`}
          />
        </a>
      </Link>
    </li>
  );
};

export default Option;
