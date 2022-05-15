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
