import EpisodeType from '@customTypes/EpisodeType';
import getResources from '@src/utilities/getResources';

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
    { podcastId }: { podcastId: string },
  ): Promise<{ episodes: EpisodeType[] }> => {
    const episodes = await getResources<EpisodeType>({
      model: EpisodeModel,
      query: { podcast: podcastId },
    });

    return { episodes };
  },
};

export default query;
