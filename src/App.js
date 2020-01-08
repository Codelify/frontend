import React from "react";
// import './App.css';
import Default from "./components/Default";
import Login from "./components/Login";
import Landing from "./views/Landing";
import { Router } from "@reach/router";

function App() {
  return (
    <Router>
      <Landing path="/" />
      <Login path="/login" />
      <Default exact path="/app" component={Default} />
    </Router>
  );
}

export default App;
