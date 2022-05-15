import userMutations from 'src/users/usersMutations';
import podcastMutations from '@src/podcasts/podcastsMutations';
import podcastQueries from '@src/podcasts/podcastQueries';
import episodeMutations from '@src/episodes/episodeMutations';

const resolvers = {
  Query: {
    ...podcastQueries,
  },
  Mutation: { ...userMutations, ...podcastMutations, ...episodeMutations },
};

export default resolvers;
