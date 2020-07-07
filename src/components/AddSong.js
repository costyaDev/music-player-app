import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { Link, AddBoxOutlined } from "@material-ui/icons";
import ReactPlayer from "react-player";
import SoundcloudPlayer from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SONG } from "../graphql/mutation";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
}));

const AddSong = () => {
  const DEFAULT_SONG = { duration: 0, title: "", artist: "", thumbnail: "" };

  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = useState("");
  const [playabel, setPlayable] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);
  const classes = useStyle();

  useEffect(() => {
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  const handleInputError = (field) => {
    // return error && error.graphQLErrors[0].extensions.path.includes(field);
    return error?.graphQLErrors[0]?.extensions?.path?.includes(field);
  };

  const handleChangeSong = (e) => {
    const { name, value } = e.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYouTubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  };

  const handleAddSong = async () => {
    try {
      const { url, duration, artist, title, thumbnail } = song;

      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
          duration: duration > 0 ? duration : null,
        },
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.error("error adding song");
    }
  };

  const getYouTubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  };

  const getSoundCloudInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const { thumbnail, title, artist } = song;

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt="song thumbnail"
            className={classes.thumbnail}
          />
          <TextField
            onChange={handleChangeSong}
            value={title}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleInputError("title")}
            helperText={handleInputError("title") && "Fill out field"}
          />
          <TextField
            onChange={handleChangeSong}
            value={artist}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleInputError("artist")}
            helperText={handleInputError("artist") && "Fill out field"}
          />
          <TextField
            onChange={handleChangeSong}
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleInputError("thumbnail")}
            helperText={handleInputError("thumbnail") && "Fill out field"}
          />
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cencel
            </Button>
            <Button onClick={handleAddSong} variant="outlined" color="primary">
              Add Song
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <TextField
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        className={classes.urlInput}
        placeholder="Add Youtube or Soundcloud URL"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playabel}
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
};

export default AddSong;
