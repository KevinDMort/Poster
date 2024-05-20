import { ApolloClient, createHttpLink, gql, concat, InMemoryCache, ApolloLink } from '@apollo/client';
import {getAccessToken} from '../auth';


const httpLink = createHttpLink({uri: 'http://localhost:9000/graphql'});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
     if(accessToken)
       {
         operation.setContext({
          headers: {'Authorization': `Bearer ${accessToken}`}
         });
      }
  return forward(operation);
})
export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache()
});
  export const timelineQuery = gql`
  query timeline ($limit: Int!, $offset: Int!) {
  timeline (limit: $limit, offset: $offset) {
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
}`;

export const userDetailsQuery = gql`query($userId: ID!) {
  user(id: $userId) {
    id
    username
    email
  }
}`;

export const getPostByIdQuery = gql`query($postId: ID!){
  post(id: $postId) {
    id
    username
    content
    createdAt
    likesCount
    replies {
      username
      content
      createdAt
    }
  }
}`;

export const getListOfFollowed = gql `
query{
  followingList {
    id
    username
    email
  }
}`;