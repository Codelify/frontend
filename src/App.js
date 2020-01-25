import React, { useEffect } from "react";
import "./App.css";
import Default from "./components/Default";
import Login from "./components/Login";
import Landing from "./views/Landing";
import { Router } from "@reach/router";
import SlackAuthenticator from "./components/SlackAuthenticator";
import { initGA, PageView } from "./components/~common/Tracking";

function App() {
  useEffect(() => {
    initGA("UA-156941509-1");
    PageView();
  }, []);
  return (
    <Router>
      <Landing path="/" />
      <Login path="/login" />
      <Default exact path="/app" component={Default} />
      <SlackAuthenticator path="/slack/auth" />
    </Router>
  );
}

export default App;
