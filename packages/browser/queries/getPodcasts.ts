import { gql } from '@apollo/client';

const getPodcastsQuery = gql`
  query getPodcasts($page: Int!, $limit: Int!) {
    getPodcasts(page: $page, limit: $limit) {
      podcasts {
        title
        website
        cover
        _id
      }
    }
  }
`;
export default getPodcastsQuery;
