import getPodcastById from './getPodcastById';

const query = {
  getPodcast: async (
    _: any,
    { podcastId }: { podcastId: string },
  ): // @ts-ignore
  Promise<PodcastType> => {
    return (await getPodcastById(podcastId)).populate('user').execPopulate();
  },
};

export default query;
