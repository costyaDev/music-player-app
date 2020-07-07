import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import { GET_QUEUED_SONG } from "./queries";

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://music-app-share.herokuapp.com/v1/graphql",
    options: {
      reconnect: true,
    },
  }),
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }
    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }
    type Query {
      queuedSongs: [Song]!
    }
    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONG,
        });
        if (queryResult) {
          const { queuedSongs } = queryResult;
          const isInQueue = queuedSongs.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queuedSongs.filter((song) => song.id !== input.id)
            : [...queuedSongs, input];
          cache.writeQuery({
            query: GET_QUEUED_SONG,
            data: { queuedSongs: newQueue },
          });
          return newQueue;
        }
        return [];
      },
    },
  },
});

const hasQueue = Boolean(localStorage.getItem("queue"));

const data = {
  queuedSongs: hasQueue ? JSON.parse(localStorage.getItem("queue")) : [],
};
client.writeData({ data });
// import ApolloClient from "apollo-boost";

// const client = new ApolloClient({
//   uri: "https://music-app-share.herokuapp.com/v1/graphql",
// });

export default client;
