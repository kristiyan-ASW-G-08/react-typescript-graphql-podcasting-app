import { gql } from '@apollo/client';

export const UserMutation = gql`
  mutation createUserMutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUserMutation(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
    }
  }
`;
