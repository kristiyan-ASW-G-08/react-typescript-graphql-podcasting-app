import { gql } from '@apollo/client';

export const createEpisodeMutation = gql`
  mutation createEpisodeMutation(
    $title: String!
    $description: String!
    $audioFile: Upload!
    $podcast: ID!
  ) {
    createEpisodeMutation(
      title: $title
      description: $description
      audioFile: $audioFile
      podcast: $podcast
    ) {
      _id
    }
  }
`;
