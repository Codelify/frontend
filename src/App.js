import React, { useEffect } from "react";
import "./App.css";
import Default from "./components/Default";
import Login from "./components/Login";
import Landing from "./views/Landing";
import AccessDenied from './views/AccessDenied';
import Profile from './views/Profile';
import SingleSnippet from './views/SingleSnippet'
import { Router } from "@reach/router";
import SlackAuthenticator from "./components/SlackAuthenticator";
import { initGA } from "./components/~common/Tracking";
import config from "./utils/config";
import { useLocation } from "@reach/router"

function App() {
  useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
  }, []);
  const auth = typeof window !== "undefined" && window.localStorage.getItem("token");
  const location = useLocation();
  // If no token and not trying to login with slack
  // then we render the Landing page by default
  if(location.pathname === '/access_denied'){
    return (
      <AccessDenied />
    )
  }
  else if (!auth && location.pathname !== '/slack/auth'){
    return (
      <Landing />
    )
  }
  else {
    return (
      <Router>
        <Landing path="/" />
        <AccessDenied path="/access_denied" />
        <Profile path="/profile" />
        <SingleSnippet path="/snippets/:shareId" />
        <Login path="/login" />
        <Default exact path="/app" component={Default} />
        <SlackAuthenticator path="/slack/auth" />
      </Router>
    );  
  }


}

export default App;