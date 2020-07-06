import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://music-app-share.herokuapp.com/v1/graphql",
});

export default client;
