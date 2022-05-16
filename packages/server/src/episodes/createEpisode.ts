import CreateEpisodeDto from '@episodes/CreateEpisodeDto';
import EpisodeModel from '@src/episodes/EpisodeModel';
import EpisodeType from '@customTypes/EpisodeType';

const createEpisode = (args: CreateEpisodeDto): Promise<EpisodeType> => {
  return new EpisodeModel(args).save();
};

export default createEpisode;
