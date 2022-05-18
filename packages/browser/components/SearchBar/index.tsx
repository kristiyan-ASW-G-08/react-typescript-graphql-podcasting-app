import styles from './index.module.scss';
import getPodcastsByTitleQuery from '@/queries/getPodcastsByTitle';
import { SyntheticEvent, useState } from 'react';
import apolloClient from 'apolloClient';
import Podcast from 'types/Podcast';
import Option from './Option';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const SearchBar = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const searchHandler = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const {
      data: { getPodcastsByTitle },
    } = await apolloClient.query({
      query: getPodcastsByTitleQuery,
      variables: { title: target.value },
    });

    setPodcasts(getPodcastsByTitle.podcasts);
  };

  return (
    <form className={styles.form} role="search">
      <input
        name="file"
        type="search"
        placeholder="Search for your favorite podcasts"
        onChange={searchHandler}
      />
      {podcasts.length > 0 ? (
        <ul className={styles.datalist}>
          <li className={styles.closeDatalist}>
            <button onClick={() => setPodcasts([])}>
              <FontAwesomeIcon icon="xmark" />
            </button>
          </li>

          {podcasts.map(podcast => (
            <Option key={podcast._id} {...podcast} />
          ))}
        </ul>
      ) : null}
    </form>
  );
};

export default SearchBar;
