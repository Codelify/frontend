import ApolloClient from "apollo-boost";
// import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
  uri: "https://codelify.herokuapp.com/graphql"
  // cache: new InMemoryCache()
});
