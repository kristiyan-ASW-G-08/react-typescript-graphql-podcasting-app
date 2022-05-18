import EpisodeType from '@customTypes/EpisodeType';
import getResources from '@customUtilities/getResources';

import EpisodeModel from './EpisodeModel';
import getEpisodeByIs from './getEpisodeById';

const query = {
  getEpisode: async (
    _: any,
    { episodeId }: { episodeId: string },
  ): // @ts-ignore
  Promise<EpisodeType> => {
    return (await getEpisodeByIs(episodeId))
      .populate([
        { path: 'user', select: 'username' },
        { path: 'podcast', select: 'title cover' },
      ])
      .execPopulate();
  },
  getEpisodesByPodcast: async (
    _: any,
    {
      podcastId,
      page,
      limit,
    }: { podcastId: string; page: number; limit: number },
  ): Promise<{ episodes: EpisodeType[]; count: number }> => {
    const { documents, count } = await getResources<EpisodeType>({
      model: EpisodeModel,
      query: { podcast: podcastId },
      pagination: { page, limit },
    });

    return { episodes: documents, count };
  },
};

export default query;
