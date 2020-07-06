import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

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

const QueuedSongList = () => {
  const greaterThanMD = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const song = {
    title: "costa",
    artist: "epshtein",
    thumbnail:
      "https://s3-eu-central-1.amazonaws.com/wow-website/wp-content/uploads/2019/07/01133105/Delivery_banner11.jpg",
  };

  return (
    greaterThanMD && (
      <div
        style={{
          margin: "10px 0",
        }}
      >
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, index) => (
          <QueuedSong key={index} song={song} />
        ))}
      </div>
    )
  );
};

const QueuedSong = ({ song }) => {
  const classes = useStyle();

  const { title, artist, thumbnail } = song;

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
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
};

export default QueuedSongList;
