import { ApolloClient, createHttpLink, gql, concat, InMemoryCache, ApolloLink, split } from '@apollo/client';
import { getAccessToken } from '../auth';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { Kind, OperationTypeNode } from 'graphql';
import { getMainDefinition } from '@apollo/client/utilities';

// Authentication link to include the access token in headers
const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});

// HTTP link for regular queries and mutations
const httpLink = concat(authLink, createHttpLink({ uri: 'http://localhost:9000/graphql' }));

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:9000/graphql',
  connectionParams: () => {
    const token = getAccessToken();
    console.log("WebSocket Access Token:", token);
    return { accessToken: token };
  },
}));

// Function to check if an operation is a subscription
function isSubscription(operation) {
  const definition = getMainDefinition(operation.query);
  return (
    definition.kind === Kind.OPERATION_DEFINITION &&
    definition.operation === OperationTypeNode.SUBSCRIPTION
  );
}

// Split link to direct operations to the correct link (HTTP or WebSocket)
const splitLink = split(isSubscription, wsLink, httpLink);

// Apollo Client setup
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// GraphQL queries
export const timelineQuery = gql`
  query timeline($limit: Int!, $offset: Int!) {
    timeline(limit: $limit, offset: $offset) {
      id
      userID
      content
      createdAt
      likesCount
      username
      replies {
        id
        userID
        content
        createdAt
        likesCount
        username
      }
    }
  }
`;

export const exploretimelineQuery = gql`
  query exploretimeline($limit: Int!, $offset: Int!) {
    exploretimeline(limit: $limit, offset: $offset) {
      id
      userID
      content
      createdAt
      likesCount
      username
      replies {
        id
        userID
        content
        createdAt
        likesCount
        username
      }
    }
  }
`;

export const userDetailsQuery = gql`
  query($userId: ID!) {
    user(id: $userId) {
      id
      username
      email
      location
      description
      followerCount
    }
  }
`;

export const getPostByIdQuery = gql`
  query($postId: ID!) {
    post(id: $postId) {
      id
      userID
      username
      content
      createdAt
      likesCount
      replies {
        id
        userID
        username
        content
        createdAt
      }
    }
  }
`;

export const getListOfFollowed = gql`
  query {
    followingList {
      id
      username
      email
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($conversationID: String!) {
    messages(conversationID: $conversationID) {
      id
      content
      senderName
      senderID
      receiverName
      receiverID
      timestamp
    }
  }
`;

export const GET_CHATS = gql`
  query GetChats {
    chats {
      id
      participants {
        id
        username
      }
      lastMessage {
        content
        timestamp
      }
    }
  }
`;
export const postsHistory = gql`
query postsforuserID($userID: ID!, $limit: Int!, $offset: Int!){
  postsforuserID(userID: $userID, limit: $limit , offset:$offset) {
    id
    username
    userID
    content
    createdAt
    likesCount
    
  }
}
`;