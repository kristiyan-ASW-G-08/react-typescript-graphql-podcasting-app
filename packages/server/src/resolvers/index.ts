import userMutations from 'src/users/usersMutations';
import podcastMutations from '@src/podcasts/podcastsMutations';

const resolvers = {
  Query: {
    getUser: async () => {},
  },
  Mutation: { ...userMutations, ...podcastMutations },
};

export default resolvers;
