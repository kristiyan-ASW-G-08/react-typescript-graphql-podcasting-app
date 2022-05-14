import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import createPodcast from '@src/podcasts/createPodcast';
import connectToDB from '@customUtilities/connectToDB';
import PodcastModel from '@src/podcasts/PodcastModel';
import CreatePodcastDto from '../CreatePodcastDto';

describe('createPodcast', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const title = 'title';
  const website = 'https://somesite.com';
  const cover = 'image/some-image';
  const user = mongoose.Types.ObjectId();
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await PodcastModel.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await PodcastModel.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );

  it('should create a new podcast', async (): Promise<void> => {
    expect.assertions(4);
    const createPodcastDto: CreatePodcastDto = {
      title,
      website,
      cover,
      // @ts-ignore
      user,
    };
    await createPodcast(createPodcastDto);
    const podcast = await PodcastModel.findOne({ title });
    if (podcast !== null) {
      expect(podcast.title).toBe(title);
      expect(podcast.website).toBe(website);
      expect(podcast.cover).toBe(cover);
      // @ts-ignore
      expect(user.equals(mongoose.Types.ObjectId(podcast.user))).toBeTruthy();
    }
  });
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(1);
    const podcastObj = {
      title,
      website,
      cover,
      // @ts-ignore
      user,
    };
    await PodcastModel.insertMany([podcastObj]);
    // @ts-ignore
    await expect(createPodcast(podcastObj)).rejects.toThrowError();
  });
});
