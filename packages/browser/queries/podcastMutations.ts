import { gql } from '@apollo/client';

export const createPodcastMutation = gql`
  mutation createPodcastMutation(
    $title: String!
    $website: String!
    $cover: Upload!
  ) {
    createPodcastMutation(title: $title, website: $website, cover: $cover) {
      _id
    }
  }
`;

export const updatePodcastMutation = gql`
  mutation updatePodcastMutation(
    $title: String!
    $website: String!
    $cover: Upload
    $_id: ID!
  ) {
    updatePodcastMutation(
      title: $title
      website: $website
      cover: $cover
      _id: $_id
    ) {
      _id
    }
  }
`;
