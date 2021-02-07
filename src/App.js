import React from "react";
// UI
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// Pages
import Home from "./pages/home";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Home />
      </Container>
    </>
  );
};

export default App;
