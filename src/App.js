import React, { useContext, useReducer, createContext } from "react";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import Header from "./components/Header";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import songReducer from "./state/reducer";

export const SongContext = createContext({
  song: {
    id: "0340418f-6d58-4200-8827-f2b7f206ec4f",
    title: "Your friends",
    artist: "Omer Adam",
    thumbnail:
      "https://i.ytimg.com/vi/D-DeH1KTwN4/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDF9Vn3_wuMdgUfjx0C9eELWsC9hQ",
    url: "https://www.youtube.com/watch?v=D-DeH1KTwN4",
    duration: 326,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThanMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const greaterThanSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSM ? 80 : 10,
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMD
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70,
                }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
