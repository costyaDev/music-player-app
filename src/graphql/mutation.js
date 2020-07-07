import { gql } from "apollo-boost";

export const ADD_SONG = gql`
  mutation addSong(
    $title: String!
    $artist: String!
    $thumbnail: String!
    $duration: Float!
    $url: String!
  ) {
    insert_songs(
      objects: {
        title: $title
        artist: $artist
        url: $url
        thumbnail: $thumbnail
        duration: $duration
      }
      on_conflict: { constraint: songs_pkey, update_columns: artist }
    ) {
      affected_rows
    }
  }
`;
