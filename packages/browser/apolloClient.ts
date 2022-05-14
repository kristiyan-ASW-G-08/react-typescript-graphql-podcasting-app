import { ApolloClient, HttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { userDataVar, tokenVar } from 'variables';
//@2
import { createUploadLink } from 'apollo-upload-client';

const apolloClient = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: `bearer ${
        typeof window !== 'undefined'
          ? //@ts-ignore
            JSON.parse(localStorage.getItem('token'))
          : ''
      }`,
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          token: {
            read() {
              return tokenVar();
            },
          },
          userData: {
            read() {
              return userDataVar();
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
