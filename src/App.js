import React, { useEffect } from "react";
import "./App.css";
import Default from "./components/Default";
import Login from "./components/Login";
import Landing from "./views/Landing";
import AccessDenied from './views/AccessDenied'
import Profile from './views/Profile'
import { Router } from "@reach/router";
import SlackAuthenticator from "./components/SlackAuthenticator";
import { initGA } from "./components/~common/Tracking";
import config from "./utils/config";

function App() {
  useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
  }, []);
  return (
    <Router>
      <Landing path="/" />
      <AccessDenied path="/access_denied" />
      <Profile path="/profile" />
      <Login path="/login" />
      <Default exact path="/snippets/:name" component={Default} />
      <SlackAuthenticator path="/slack/auth" />
    </Router>
  );
}

export default App;
