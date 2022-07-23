import PodcastType from '@src/types/PodcastType';
import getResources from '@customUtilities/getResources';
import getPodcastById from './getPodcastById';
import PodcastModel from './PodcastModel';

const query = {
  getPodcast: async (
    _: any,
    { podcastId }: { podcastId: string },
  ): // @ts-ignore
  Promise<PodcastType> => {
    return (await getPodcastById(podcastId)).populate('user').execPopulate();
  },
  getPodcasts: async (
    _: any,
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ): // @ts-ignore
  Promise<{ podcasts: PodcastType[]; count: number }> => {
    const { documents, count } = await getResources<PodcastType>({
      model: PodcastModel,
      query: userId ? { user: userId } : {},
      pagination: { page, limit },
    });

    return { podcasts: documents, count };
  },
  getPodcastsByTitle: async (
    _: any,
    { title }: { title: string },
  ): // @ts-ignore
  Promise<{ podcasts: PodcastType[] }> => {
    const searchRegex = new RegExp(title, 'gi');
    const podcasts = await PodcastModel.find(
      {
        title: { $regex: searchRegex },
      },
      'title cover',
    )
      .select([
        { $match: { $text: { $search: 'Pattern' } } },
        { score: { $meta: 'textScore' } },
      ])
      .limit(5)
      .exec();
    return { podcasts };
  },
};

export default query;
