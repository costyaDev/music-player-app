import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./components/theme";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
