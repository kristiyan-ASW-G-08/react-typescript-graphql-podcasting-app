import writeFile from '@customUtilities/writeFile';
import CreatePodcastDto from '@podcasts/CreatePodcastDto';
import validationHandler from '@customUtilities/validationHandler';
import PodcastValidator from '@pod/common/source/schemaValidators/PodcastValidator';
import UpdatePodcastValidator from '@pod/common/source/schemaValidators/UpdatePodcastValidator';
import createPodcast from '@podcasts/createPodcast';
import PodcastType from '@customTypes/PodcastType';
import authorizationHandler from '@customUtilities/authorizationHandler';
import deleteFile from '@customUtilities/deleteFile';
import Context from '@src/types/Context';
import getPodcastById from './getPodcastById';
import EditPodcastDto from './EditPodcastDto';

const mutation = {
  createPodcastMutation: async (
    _: any,
    { title, website, cover }: CreatePodcastDto,
    // @ts-ignore
    { headers: { authorization } }: Context,
  ): Promise<PodcastType> => {
    const secret = process.env.SECRET;
    const user = authorizationHandler(authorization, secret);
    await validationHandler({ title, website, cover }, PodcastValidator);
    const { filename, createReadStream } = await cover.promise;
    const stream = createReadStream();
    const filePath = writeFile(filename, stream);
    return createPodcast({ title, cover: filePath, website, user });
  },
  updatePodcastMutation: async (
    _: any,
    { title, website, cover, _id }: EditPodcastDto,
    // @ts-ignore
    { headers: { authorization } }: Context,
  ): Promise<any> => {
    const secret = process.env.SECRET;
    authorizationHandler(authorization, secret);
    await validationHandler({ title, website, cover }, UpdatePodcastValidator);

    const podcast = await getPodcastById(_id);
    if (cover) {
      const { filename, createReadStream } = await cover.promise;
      const stream = createReadStream();
      const filePath = writeFile(filename, stream);
      deleteFile(podcast.cover);
      podcast.cover = filePath;
    }
    podcast.title = title;
    podcast.website = website;
    await podcast.save({ validateModifiedOnly: true });
    return podcast;
  },
};

export default mutation;
