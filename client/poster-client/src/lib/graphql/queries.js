import { ApolloClient, createHttpLink, gql, concat, InMemoryCache, ApolloLink } from '@apollo/client';


const httpLink = createHttpLink({uri: 'http://localhost:9000/graphql'});

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache(),
  });
