import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { sign } from 'jsonwebtoken';
import connectToDB from '@customUtilities/connectToDB';
import UserModel from '@src/users/UserModel';
import PodcastModel from '@src/podcasts/PodcastModel';
// @ts-ignore
import typeDefs from '@typeDefs/typeDefs';
import { Readable } from 'stream';
// @ts-ignore
import { Upload } from 'graphql-upload/public';
import resolvers from '../../resolvers/index';

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

  describe('Queries', () => {
    afterEach(async () => {
      await PodcastModel.deleteMany({}).exec();
    });

    describe('getPodcast', () => {
      it('should return a podcast successfully', async () => {
        expect.assertions(2);
        const podcast = await new PodcastModel({
          title: 'someTitle',
          website: 'someWebsite',
          user: mongoose.Types.ObjectId(),
          cover: 'someCover',
        }).save();
        const podcastId = podcast._id.toString();
        // @ts-ignore
        const query = `
          query getPodcast( $podcastId:ID!) {
            getPodcast(podcastId: $podcastId) {
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
            podcastId,
          },
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.getPodcast._id).toBeTruthy();
      });

      it('should return a 404 not found error', async () => {
        expect.assertions(1);
        const podcastId = mongoose.Types.ObjectId().toString();
        // @ts-ignore
        const query = `
          query getPodcast( $podcastId:ID!) {
            getPodcast(podcastId: $podcastId) {
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
            podcastId,
          },
        });
        expect(result.errors).toMatchSnapshot();
      });
    });

    describe('getPodcasts', () => {
      it('should return  podcasts successfully', async () => {
        const podcast = {
          website: 'someWebsite',
          cover: 'someCover',
        };
        const podcasts = [
          { ...podcast, title: 'someTitle1', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle2', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle3', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle4', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle5', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle6', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle7', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle8', user: mongoose.Types.ObjectId() },
        ];
        await PodcastModel.insertMany(podcasts);
        expect.assertions(2);
        // @ts-ignore
        const query = `
        query getPodcasts($page: Int!, $limit: Int!) {
          getPodcasts(page: $page, limit: $limit) {
            podcasts {
              title
              website
              cover
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
            page: 1,
            limit: 5,
          },
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.getPodcasts.podcasts).toHaveLength(5);
      });
    });

    describe('getPodcastsByTitle', () => {
      it('should return  podcasts successfully', async () => {
        const podcast = {
          website: 'someWebsite',
          cover: 'someCover',
        };
        const podcasts = [
          {
            ...podcast,
            title: 'correctTitle1',
            user: mongoose.Types.ObjectId(),
          },
          {
            ...podcast,
            title: 'correctTitle2',
            user: mongoose.Types.ObjectId(),
          },
          {
            ...podcast,
            title: 'correctTitle3',
            user: mongoose.Types.ObjectId(),
          },
          {
            ...podcast,
            title: 'correctTitle4',
            user: mongoose.Types.ObjectId(),
          },
          { ...podcast, title: 'someTitle5', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle6', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle7', user: mongoose.Types.ObjectId() },
          { ...podcast, title: 'someTitle8', user: mongoose.Types.ObjectId() },
        ];
        await PodcastModel.insertMany(podcasts);
        expect.assertions(2);
        // @ts-ignore
        const query = `
        query getPodcastsByTitle($title:String!) {
          getPodcastsByTitle(title: $title) {
            podcasts {
              title
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
            title: 'correctTitle',
          },
        });
        expect(result.errors).toBeUndefined();
        expect(result.data?.getPodcastsByTitle.podcasts).toHaveLength(4);
      });
    });
  });
});
