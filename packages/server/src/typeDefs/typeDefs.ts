import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Upload

  type User {
    username: String!
    email: String!
    id: ID!
  }

  type Query {
    getUser: User!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type UserLoginPayload {
    username: String!
    email: String!
    token: String!
  }
  type Podcast {
    title: String!
    website: String!
    user: User!
    _id: ID!
  }
  type Query {
    podcasts(query: String): [Podcast]!
  }
  type Mutation {
    createUserMutation(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): UserLoginPayload!

    loginMutation(email: String!, password: String!): UserLoginPayload!

    createPodcastMutation(
      title: String!
      website: String!
      cover: Upload!
    ): Podcast!

    updatePodcastMutation(
      title: String!
      website: String!
      cover: Upload
      _id: ID!
    ): Podcast!
  }
`;

export default typeDefs;
