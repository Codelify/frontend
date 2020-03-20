import React, { useEffect } from "react";
import "./App.css";
import Default from "./components/Default";
import Login from "./components/Login";
import Landing from "./views/Landing";
import AccessDenied from './views/AccessDenied';
import PageNotFound from './views/PageNotFound'
import Profile from './views/Profile';
import SingleSnippet from './views/SingleSnippet'
import { Router } from "@reach/router";
import SlackAuthenticator from "./components/SlackAuthenticator";
import { initGA } from "./components/~common/Tracking";
import config from "./utils/config";
import isLoggedIn from './utils/auth';
import { useLocation } from "@reach/router";

function App() {
  useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
  }, []);
  const auth = isLoggedIn();
  const location = useLocation();
  
  const NotFound = () =>{
    if(!auth && (location.pathname === '/app' || location.pathname === '/profile')){
      return <AccessDenied />
    }
    else return <PageNotFound />
  } 

  return(
      <Router>
        {/* Public routes */}
        <Landing path="/" />
        <AccessDenied path="/access_denied" />
        <SingleSnippet path="/view/snippet/:shareId" />
        <Login path="/login" />
        <SlackAuthenticator path="/slack/auth" />
        {
          auth && (
            // Protected routes
            <>
            <Default exact path="/app" component={Default} />
            <Profile path="/profile" />    
            </>
          )
        }
        {/* Not found or forbiden */}
        <NotFound default />
      </Router>
    )
}

export default App;