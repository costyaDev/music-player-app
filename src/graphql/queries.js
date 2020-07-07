import { gql } from "apollo-boost";

export const GET_QUEUED_SONG = gql`
  query getQueuedSongs {
    queuedSongs @client {
      id
      duration
      title
      artist
      url
      thumbnail
    }
  }
`;
