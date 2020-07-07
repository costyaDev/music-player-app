import React, { useContext, useState, useRef, useEffect } from "react";
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
import { SkipPrevious, PlayArrow, SkipNext, Pause } from "@material-ui/icons";
import { SongContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUEUED_SONG } from "../graphql/queries";
import ReactPlayer from "react-player";

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
  const { data } = useQuery(GET_QUEUED_SONG);
  const reactPlayerRef = useRef();
  const { state, dispatch } = useContext(SongContext);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [positionInQueue, setPositionInQueue] = useState(0);
  const classes = useStyle();

  useEffect(() => {
    const songIndex = data.queuedSongs.findIndex(
      (song) => song.id === state.song.id
    );
    setPositionInQueue(songIndex);
  }, [data.queuedSongs, state.song.id]);

  useEffect(() => {
    const nextSong = data.queuedSongs[positionInQueue + 1];
    if (played === 1 && nextSong) {
      setPlayed(0);
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }, [data.queuedSongs, played, dispatch, positionInQueue]);

  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleSliderChange = (e, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };
  const handleSeekMouseUp = () => {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  };

  const formatDuration = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  const handlePlayPrevSong = () => {
    const prevSong = data.queuedSongs[positionInQueue - 1];
    if (prevSong) {
      dispatch({ type: "SET_SONG", payload: { song: prevSong } });
    }
  };
  const handlePlayNextSong = () => {
    const nextSong = data.queuedSongs[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  };

  console.log(state.song.url);

  return (
    <>
      <Card className={classes.conteiner} variant="outline">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton onClick={handlePlayPrevSong}>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              {state.isPlaying ? (
                <Pause
                  onClick={handleTogglePlay}
                  className={classes.playIcon}
                />
              ) : (
                <PlayArrow
                  onClick={handleTogglePlay}
                  className={classes.playIcon}
                />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNextSong}>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleSliderChange}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueuerdSongList queue={data.queuedSongs} />
    </>
  );
};

export default SongPlayer;
