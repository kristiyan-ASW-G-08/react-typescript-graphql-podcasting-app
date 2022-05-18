import { gql } from '@apollo/client';

const getPodcastsByTitleQuery = gql`
  query getPodcastsByTitle($title: String!) {
    getPodcastsByTitle(title: $title) {
      podcasts {
        title
        cover
        _id
      }
    }
  }
`;
export default getPodcastsByTitleQuery;
