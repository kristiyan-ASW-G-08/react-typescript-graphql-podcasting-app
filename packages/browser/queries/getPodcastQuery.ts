import { gql } from '@apollo/client';

const getPodcast = gql`
  query getPodcast($podcastId: ID!) {
    getPodcast(podcastId: $podcastId) {
      title
      website
      cover
      _id
      user {
        username
        _id
      }
    }
  }
`;

export default getPodcast;
