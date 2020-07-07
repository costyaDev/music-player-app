import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutation";
import { useMutation } from "@apollo/react-hooks";

const useStyle = makeStyles((theme) => ({
  conteiner: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  songInfo: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

const QueuedSongList = ({ queue }) => {
  const greaterThanMD = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // const song = {
  //   title: "costa",
  //   artist: "epshtein",
  //   thumbnail:
  //     "https://s3-eu-central-1.amazonaws.com/wow-website/wp-content/uploads/2019/07/01133105/Delivery_banner11.jpg",
  // };

  return (
    greaterThanMD && (
      <div
        style={{
          margin: "10px 0",
        }}
      >
        <Typography color="textSecondary" variant="button">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, index) => (
          <QueuedSong key={index} song={song} />
        ))}
      </div>
    )
  );
};

const QueuedSong = ({ song }) => {
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const classes = useStyle();

  const { title, artist, thumbnail } = song;

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };

  return (
    <div className={classes.conteiner}>
      <Avatar className={classes.avatar} src={thumbnail} alt="Song thumbnail" />
      <div className={classes.songInfo}>
        <Typography className={classes.text} variant="subtitle2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="body2"
        >
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueuedSongList;
