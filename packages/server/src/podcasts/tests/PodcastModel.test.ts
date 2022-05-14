import mongoose from 'mongoose';
import PodcastModel from '@src/podcasts/PodcastModel';
import PodcastType from '@customTypes/PodcastType';
import connectToDB from '@customUtilities/connectToDB';
import duplicationErrorHandler from '@customUtilities/duplicationErrorHandler';
import CreatePodcastDto from '../CreatePodcastDto';

jest.mock('@customUtilities/duplicationErrorHandler');
const duplicationErrorHandlerMock = duplicationErrorHandler as jest.MockedFunction<
  typeof duplicationErrorHandler
>;
describe('PodcastModel', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const title = 'someTitle';
  const website = 'http://sometestsome.com';
  const cover = 'someImageUrl';
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
    expect.assertions(5);

    const podcast: PodcastType = new PodcastModel({
      title,
      user,
      website,
      cover,
    });
    await expect(podcast.save()).resolves.not.toThrowError();
    expect(podcast.title).toBe(title);
    expect(podcast.user).toBe(user);
    expect(podcast.website).toBe(website);
    expect(podcast.cover).toBe(cover);
  });
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(3);
    const podcastObj = {
      title,
      website,
      cover,
      // @ts-ignore
      user,
    };
    await PodcastModel.insertMany([podcastObj]);
    const podcast = new PodcastModel(podcastObj);
    await expect(podcast.save()).rejects.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(0);
    expect(podcast.validate).toThrowError();
  });
});
