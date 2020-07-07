import React from "react";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles,
  CardMedia,
} from "@material-ui/core";
import { PlayArrow, Save, Details } from "@material-ui/icons";
import { useSubscription } from "@apollo/react-hooks";
import { GET_SONGS } from "../graphql/subscriptions";

const SongList = () => {
  const { data, loading, error } = useSubscription(GET_SONGS);

  // const song = {
  //   title: "costa",
  //   artist: "epshtein",
  //   thumbnail:
  //     "https://s3-eu-central-1.amazonaws.com/wow-website/wp-content/uploads/2019/07/01133105/Delivery_banner11.jpg",
  // };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress></CircularProgress>
      </div>
    );
  }

  if (error) return <div>Error fetching songs</div>;

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoConteiner: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
}));

const Song = ({ song }) => {
  const { thumbnail, title, artist } = song;
  const classes = useStyle();

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoConteiner}>
        <CardMedia className={classes.thumbnail} image={thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton color="primary" size="small">
              <PlayArrow />
            </IconButton>
            <IconButton color="secondary" size="small">
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
};
export default SongList;
