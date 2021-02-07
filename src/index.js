import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Store
import { StateProvider } from "./store/store.js";

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
