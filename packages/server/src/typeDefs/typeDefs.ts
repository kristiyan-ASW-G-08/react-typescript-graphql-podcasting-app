import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Upload

  type User {
    username: String!
    email: String!
    _id: ID!
  }

  type Query {
    getUser: User!
  }

  type UserLoginPayload {
    username: String!
    email: String!
    userId: String!
    token: String!
  }
  type Podcast {
    title: String!
    website: String!
    cover: String!
    user: User!
    _id: ID!
  }

  type Episode {
    title: String!
    description: String!
    audioFile: String!
    date: String!
    user: User!
    podcast: Podcast!
    _id: ID!
  }
  type Episodes {
    episodes: [Episode]!
    count: Int!
  }
  type Podcasts {
    podcasts: [Podcast]!
    count: Int!
  }
  type Query {
    getPodcasts(query: String, page: Int!, limit: Int!): Podcasts!
    getPodcastsByTitle(title: String!): Podcasts!
    getPodcast(podcastId: ID!): Podcast!
    getEpisode(episodeId: ID!): Episode!
    getEpisodesByPodcast(podcastId: ID!): Episodes!
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

    createEpisodeMutation(
      title: String!
      description: String!
      audioFile: Upload!
      podcast: ID!
    ): Episode!
  }
`;

export default typeDefs;
