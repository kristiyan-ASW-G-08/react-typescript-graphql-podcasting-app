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
    await UserModel.deleteMany({}).exec();
  });

  afterEach(async () => {
    await UserModel.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Mutations', () => {
    const { SECRET } = process.env;
    const token = sign(
      {
        userId: mongoose.Types.ObjectId(),
      },
      SECRET,
      { expiresIn: '96h' },
    );

    afterEach(async () => {
      await EpisodeModel.deleteMany({}).exec();
    });

    const values = {
      title: 'someTitle',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      podcastId: mongoose.Types.ObjectId().toString(),
    };
    describe('createEpisodeMutation', () => {
      it('create episode successfully', async () => {
        expect.assertions(2);
        const file = Readable.from(Buffer.from('hello upload', 'utf-8'));
        // @ts-ignore

        const upload = new Upload();
        upload.promise = new Promise(resolve =>
          resolve({
            createReadStream: () => file,
            file: {
              filename: 'some_file.mp3',
              mimetype: 'audio/mp3',
            },
            filename: 'some_file.mp3',
            mimetype: 'audio/mp3',
          }),
        );
        const query = `
          mutation createEpisodeMutation( $title:String!,$description:String!,$audioFile: Upload!,$podcastId:ID!) {
            createEpisodeMutation(title: $title,description: $description,audioFile: $audioFile,podcast:$podcastId) {
              _id
            }
          }
        `;

        const testServer = new ApolloServer({
          typeDefs,
          resolvers,
          context: () => ({ headers: { authorization: `bearer ${token}` } }),
        });

        const result = await testServer.executeOperation({
          query,
          variables: {
            audioFile: upload,
            ...values,
          },
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.createEpisodeMutation._id).toBeTruthy();
      });
    });

    it('fail to create a episode due to validation errors', async () => {
      expect.assertions(1);

      const query = `
      mutation createEpisodeMutation( $title:String!,$description:String!,$audioFile: Upload!,$podcastId:ID!) {
        createEpisodeMutation(title: $title,description: $description,audioFile: $audioFile,podcast:$podcastId) {
          _id
        }
      }
    `;

      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ headers: { authorization: `bearer ${token}` } }),
      });

      const result = await testServer.executeOperation({
        query,
        variables: {},
      });
      expect(result.errors).toMatchSnapshot();
    });
    it('fail to create a episode due to authorization error', async () => {
      expect.assertions(1);
      const file = Readable.from(Buffer.from('hello upload', 'utf-8'));
      // @ts-ignore

      const upload = new Upload();
      upload.promise = new Promise(resolve =>
        resolve({
          createReadStream: () => file,
          file: {
            filename: 'some_file.mp3',
            mimetype: 'audio/mp3',
          },
          filename: 'some_file.mp3',
          mimetype: 'audio/mp3',
        }),
      );
      const query = `
      mutation createEpisodeMutation( $title:String!,$description:String!,$audioFile: Upload!,$podcastId:ID!) {
        createEpisodeMutation(title: $title,description: $description,audioFile: $audioFile,podcast:$podcastId) {
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
          audioFile: upload,
          ...values,
        },
      });
      expect(result.errors).toMatchSnapshot();
    });
  });
});
