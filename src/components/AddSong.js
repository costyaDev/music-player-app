import React, { useState } from "react";
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
  const [dialog, setDialog] = useState(false);
  const classes = useStyle();

  const handleCloseDialog = () => {
    setDialog(false);
  };
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
            src="https://s3-eu-central-1.amazonaws.com/wow-website/wp-content/uploads/2019/07/01133105/Delivery_banner11.jpg"
            alt="song thumbnail"
            className={classes.thumbnail}
          />
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cencel
            </Button>
            <Button variant="outlined" color="primary">
              Add Song
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <TextField
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
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
    </div>
  );
};

export default AddSong;
