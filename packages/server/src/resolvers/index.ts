import userMutations from 'src/users/usersMutations';
import podcastMutations from '@src/podcasts/podcastsMutations';
import podcastQueries from '@src/podcasts/podcastQueries';
import episodeMutations from '@src/episodes/episodeMutations';
import episodeQueries from '@src/episodes/episodeQueries';

const resolvers = {
  Query: {
    ...podcastQueries,
    ...episodeQueries,
  },
  Mutation: { ...userMutations, ...podcastMutations, ...episodeMutations },
};

export default resolvers;
