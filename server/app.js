import express from 'express';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';
import { authMiddleware, handleLogin, handleSignup } from './auth/authMiddleware.js';
import { getUserByID } from './db/users.js';
import { createReplyLoader } from './db/posts.js';

const app = express();

app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);
app.post('/signup', handleSignup);
const typeDefs = await readFile('./schema/schema.graphql', 'utf8');

async function getContext({ req }) {
  const context = {replyLoader: createReplyLoader()};
  if (req.auth) {
    context.user = await getUserByID(req.auth.sub);
  }
  return context;
} 

const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers,
});
await apolloServer.start();

app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }))

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql}`);
  });
