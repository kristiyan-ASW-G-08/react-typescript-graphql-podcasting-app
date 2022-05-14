import CreatePodcastDto from '@podcasts/CreatePodcastDto';
import PodcastModel from '@src/podcasts/PodcastModel';
import PodcastType from '@customTypes/PodcastType';
import bcrypt from 'bcryptjs';

const createPodcast = (args: CreatePodcastDto): Promise<PodcastType> => {
  return new PodcastModel(args).save();
};

export default createPodcast;
