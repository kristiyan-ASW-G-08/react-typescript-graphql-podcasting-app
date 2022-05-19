import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { sign } from 'jsonwebtoken';
import connectToDB from '@customUtilities/connectToDB';
import UserModel from '@src/users/UserModel';
import EpisodeModel from '@src/episodes/EpisodeModel';
// @ts-ignore
import typeDefs from '@typeDefs/typeDefs';
import { Readable } from 'stream';
// @ts-ignore
import { Upload } from 'graphql-upload/public';
import writeFile from '@customUtilities/writeFile';
import resolvers from '../../resolvers/index';

jest.mock('@customUtilities/writeFile');

(writeFile as jest.Mock).mockReturnValue('/images/some_file.svg');
describe('Resolvers', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    await EpisodeModel.deleteMany({}).exec();
  });

  afterEach(async () => {
    await EpisodeModel.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  const values = {
    title: 'asd',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    podcast: mongoose.Types.ObjectId().toString(),
    user: mongoose.Types.ObjectId().toString(),
    audioFile: 'someAudiofile',
  };
  describe('Queries', () => {
    describe('getEpisode', () => {
      it('should return a episode successfully', async () => {
        const episode = await new EpisodeModel({ ...values }).save();
        const episodeId = episode._id.toString();
        expect.assertions(2);

        const query = `
          query getEpisode($episodeId:ID!) {
            getEpisode(episodeId:$episodeId) {
              _id
            }
          }
        `;

        const testServer = new ApolloServer({
          typeDefs,
          resolvers,
        });

        const result = await testServer.executeOperation({
          query,
          variables: {
            episodeId,
          },
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.getEpisode._id).toBeTruthy();
      });

      it('should throw an error when episode is not found', async () => {
        expect.assertions(1);

        const query = `
          mutation getEpisode( $episodeId:ID!) {
            getEpisode(episodeId:$episodeId) {
              _id
            }
          }
        `;

        const testServer = new ApolloServer({
          typeDefs,
          resolvers,
        });
        const result = await testServer.executeOperation({
          query,
          variables: {
            episodeId: mongoose.Types.ObjectId(),
          },
        });
        expect(result.errors).toMatchSnapshot();
      });
    });
  });

  describe('getEpisodesByPodcast', () => {
    it('should return a episodes successfully', async () => {
      const episode = await new EpisodeModel({ ...values }).save();
      expect.assertions(2);

      const query = `
        query getEpisodesByPodcast($podcastId:ID!) {
          getEpisodesByPodcast(podcastId:$podcastId) {
            episodes{
              _id

            }
          }
        }
      `;

      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });

      const result = await testServer.executeOperation({
        query,
        variables: {
          podcastId: episode.podcast.toString(),
        },
      });
      expect(result.errors).toBeUndefined();
      expect(result.data?.getEpisodesByPodcast.episodes).toBeTruthy();
    });
  });
});
