import getResource from '@src/services/getResource';
import PodcastType from '@src/types/PodcastType';
import PodcastModel from './PodcastModel';

const getPodcastById = async (podcastId: string): Promise<PodcastType> =>
  getResource<PodcastType>(
    PodcastModel,
    { name: '_id', value: podcastId },
    new Error('Podcast Was Not Found'),
  );

export default getPodcastById;
