import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { sign } from 'jsonwebtoken';
import FormData from 'form-data';
import connectToDB from '@customUtilities/connectToDB';
import UserModel from '@src/users/UserModel';
import PodcastModel from '@src/podcasts/PodcastModel';
// @ts-ignore
import typeDefs from '@typeDefs/typeDefs';
import apolloServer from '@customUtilities/createApoloServer';
import { string } from 'yup';
import fs from 'fs';
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
      await PodcastModel.deleteMany({}).exec();
    });

    const values = {
      title: 'someTitle',
      website: 'http://somefakewebsite.fakewebsite',
    };

    const incorrectValues = {
      username: '',
      email: 'notAnEMail',
      password: 'pass',
      confirmPAssword: '',
    };
    describe('createPodcastMutation', () => {
      it('create podcast successfully', async () => {
        expect.assertions(2);
        const file = Readable.from(Buffer.from('hello upload', 'utf-8'));
        // @ts-ignore

        const upload = new Upload();
        upload.promise = new Promise(resolve =>
          resolve({
            createReadStream: () => file,
            filename: 'some_file.svg',
            mimetype: 'text/plain',
          }),
        );
        const query = `
          mutation createPodcastMutation( $title:String!,$website:String!,$cover: Upload!) {
            createPodcastMutation(title: $title,website: $website,cover: $cover) {
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
            cover: upload,
            ...values,
          },
        });
        console.log(JSON.stringify(result.errors));
        expect(result.errors).toBeUndefined();
        expect(result.data?.createPodcastMutation._id).toBeTruthy();
      });
    });

    it('fail to create a podcast due to validation errors', async () => {
      expect.assertions(1);

      const query = `
        mutation createPodcastMutation( $title:String!,$website:String!,$cover: Upload!) {
          createPodcastMutation(title: $title,website: $website,cover: $cover) {
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
    it('fail to create a podcast due to authorization error', async () => {
      expect.assertions(1);
      const file = Readable.from(Buffer.from('hello upload', 'utf-8'));
      // @ts-ignore

      const upload = new Upload();
      upload.promise = new Promise(resolve =>
        resolve({
          createReadStream: () => file,
          filename: 'some_file.svg',
          mimetype: 'text/plain',
        }),
      );
      const query = `
        mutation createPodcastMutation( $title:String!,$website:String!,$cover: Upload!) {
          createPodcastMutation(title: $title,website: $website,cover: $cover) {
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
          cover: upload,
          ...values,
        },
      });
      expect(result.errors).toMatchSnapshot();
    });
  });
});
