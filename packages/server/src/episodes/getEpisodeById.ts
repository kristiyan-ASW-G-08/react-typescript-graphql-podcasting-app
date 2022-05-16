import getResource from '@src/services/getResource';
import EpisodeType from '@src/types/EpisodeType';
import EpisodeModel from './EpisodeModel';

const getEpisodeById = async (episodeId: string): Promise<EpisodeType> =>
  getResource<EpisodeType>(
    EpisodeModel,
    { name: '_id', value: episodeId },
    new Error('Episode Was Not Found'),
  );

export default getEpisodeById;
