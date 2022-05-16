import mongoose from 'mongoose';
import connectToDB from '@customUtilities/connectToDB';
import EpisodeModel from '@src/episodes/EpisodeModel';
import CreateEpisodeDto from '@src/episodes/CreateEpisodeDto';

describe('EpisodeModel', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const title = 'title';
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const audioFile = 'audiofiles/someaudiofile';
  const user = mongoose.Types.ObjectId();
  const podcast = mongoose.Types.ObjectId();
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await EpisodeModel.deleteMany({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await EpisodeModel.deleteMany({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );

  it('should create a new podcast', async (): Promise<void> => {
    expect.assertions(5);
    const createEpisodeDto: CreateEpisodeDto = {
      title,
      description,
      audioFile,
      // @ts-ignore
      podcast,
      // @ts-ignore
      user,
    };
    await new EpisodeModel(createEpisodeDto).save();
    const episode = await EpisodeModel.findOne({ title });
    if (episode !== null) {
      expect(episode.title).toBe(title);
      expect(episode.description).toBe(description);
      expect(episode.audioFile).toBe(audioFile);
      // @ts-ignore
      expect(user.equals(mongoose.Types.ObjectId(episode.user))).toBeTruthy();

      expect(
        // @ts-ignore
        podcast.equals(mongoose.Types.ObjectId(episode.podcast)),
      ).toBeTruthy();
    }
  });
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(1);
    const episodeObj = {
      title,
      description,
      audioFile,
      // @ts-ignore
      podcast,
      // @ts-ignore
      user,
    };
    await EpisodeModel.insertMany([episodeObj]);
    // @ts-ignore
    await expect(EpisodeModel(episodeObj).save()).rejects.toThrowError();
  });
});
