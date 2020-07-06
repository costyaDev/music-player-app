import React from "react";
import QueuerdSongList from "./QueuedSongList";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { SkipPrevious, PlayArrow, SkipNext } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  conteiner: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px",
  },
  content: {
    flex: "1 0 auto",
  },
  thumbnail: {
    width: 150,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const SongPlayer = () => {
  const classes = useStyle();
  return (
    <>
      <Card className={classes.conteiner} variant="outline">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              artist
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow className={classes.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:001:30
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} />
        </div>
        <CardMedia
          className={classes.thumbnail}
          image="https://s3-eu-central-1.amazonaws.com/wow-website/wp-content/uploads/2019/07/01133105/Delivery_banner11.jpg"
        />
      </Card>
      <QueuerdSongList />
    </>
  );
};

export default SongPlayer;
