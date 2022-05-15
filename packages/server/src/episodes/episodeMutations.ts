import authorizationHandler from '@src/utilities/authorizationHandler';
import validationHandler from '@src/utilities/validationHandler';
import Context from '@src/types/Context';
import EpisodeType from '@src/types/EpisodeType';
import EpisodeValidator from '@pod/common/source/schemaValidators/EpisodeValidator';
import writeFile from '@src/utilities/writeFile';
import CreateEpisodeDto from './CreateEpisodeDto';
import createEpisode from './createEpisode';

const episodeMutations = {
  createEpisodeMutation: async (
    _: any,
    { title, description, audioFile, podcast }: CreateEpisodeDto,
    { headers: { authorization } }: Context,
  ): Promise<EpisodeType> => {
    const secret = process.env.SECRET;
    const user = authorizationHandler(authorization, secret);
    await validationHandler(
      { title, description, audioFile },
      EpisodeValidator,
    );
    const { filename, createReadStream } = await audioFile.promise;
    const stream = createReadStream();
    const filePath = writeFile(filename, stream, 'audiofiles');
    return createEpisode({
      title,
      audioFile: filePath,
      podcast,
      description,
      user,
    });
  },
};

export default episodeMutations;
