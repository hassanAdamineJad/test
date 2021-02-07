import React from "react";
// UI
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
//CMP
import { Header } from "./components";
// Pages
import Home from "./pages/home";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Home />
      </Container>
    </>
  );
};

export default App;
