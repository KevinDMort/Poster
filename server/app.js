import express from 'express';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';
import { authMiddleware, handleLogin, handleSignup, decodeToken } from './auth/authMiddleware.js';
import { getUserByID } from './db/users.js';
import { createReplyLoader } from './db/posts.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer as useWsServer } from 'graphql-ws/lib/use/ws';
import { createServer as createHttpServer } from 'node:http';
import { WebSocketServer } from 'ws';

const app = express();

app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);
app.post('/signup', handleSignup);
const typeDefs = await readFile('./schema/schema.graphql', 'utf8');

async function getHttpContext({ req }) {
  const replyLoader = createReplyLoader();
  const context = { replyLoader };
  if (req.auth) {
    context.user = await getUserByID(req.auth.sub);
  }
  return context;
}
function getWsContext({ connectionParams }) {
  const accessToken = connectionParams?.accessToken;
  if (accessToken) {
    const payload = decodeToken(accessToken);
    return { user: { id: payload.sub, email: payload.email } };
  }
  return {};
}
const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();

app.use('/graphql', apolloMiddleware(apolloServer, { context: getHttpContext }))

const httpServer = createHttpServer(app);

const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
useWsServer({ schema, context: getWsContext }, wsServer);

const PORT = process.env.PORT || 9000;

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql}`);
  });
