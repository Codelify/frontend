import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: 'https://codelify.herokuapp.com/graphql',
  fetch,
});
