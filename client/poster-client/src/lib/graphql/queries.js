import { ApolloClient, createHttpLink, gql, concat, InMemoryCache, ApolloLink } from '@apollo/client';


const httpLink = createHttpLink({uri: 'http://localhost:9000/graphql'});

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
  });

  export const timelineQuery = gql`
  query timeline ($id: ID!, $limit: Int!, $offset: Int!) {
  timeline (id: $id, limit: $limit, offset: $offset) {
    id
    userID
    content
    createdAt
    likesCount
    username
  }
}`;

export const userDetailsQuery = gql`query($userId: ID!) {
  user(id: $userId) {
    username
    email
  }
}`;

export const getPostByIdQuery = gql`query($postId: ID!){
  post(id: $postId) {
    username
    content
    createdAt
    replies {
      username
      content
      createdAt
    }
  }
}`;