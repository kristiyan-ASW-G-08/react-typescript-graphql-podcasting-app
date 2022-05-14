import { ApolloServer } from 'apollo-server-express';
import typeDefs from '@typeDefs/typeDefs';
import resolvers from '@resolvers/index';
import connectToDB from '@customUtilities/connectToDB';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import cors from 'cors';

const corsOptions = {
  origin: '*',
  credentials: true,
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Origin': '*',
};

async function startServer(): Promise<void> {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ol9wi.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;

  connectToDB(mongoURI);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req: { headers } }) => {
      return {
        headers,
      };
    },
  });
  await server.start();
  const app = express();
  app.use(cors(corsOptions));

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  await new Promise<void>(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000`);
}

startServer();
