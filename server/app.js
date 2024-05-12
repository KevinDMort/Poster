import express from 'express';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';

const app = express();

app.use(cors(),express.json())
const typeDefs = await readFile('./schema/schema.graphql', 'utf8');


const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

app.use('/graphql', apolloMiddleware(apolloServer))

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql}`);
  });