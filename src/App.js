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
      return(
        <AccessDenied />
      )  
    }
    else 
      return(
        <p>Sorry, nothing here</p>
      )
  } 

  return(
      <Router>
        <Landing path="/" />
        <AccessDenied path="/access_denied" />
        <SingleSnippet path="/snippets/:shareId" />
        <Login path="/login" />
        <SlackAuthenticator path="/slack/auth" />
        {
          auth && (
            <>
            <Default exact path="/app" component={Default} />
            <Profile path="/profile" />    
            </>
          )
        }
        <NotFound default />
      </Router>
    )
  //If no token and not trying to login with slack
  // then we render the Landing page by default
  // if (auth) {
  //   return(
  //     <Router>
  //       <Landing path="/" />
  //       <AccessDenied path="/access_denied" />
  //       <Profile path="/profile" />
  //       <SingleSnippet path="/snippets/:shareId" />
  //       <Login path="/login" />
  //       <Default exact path="/app" component={Default} />
  //       <SlackAuthenticator path="/slack/auth" />
  //     </Router>
  //   )
  // }
  // else 
  // return (
  //   <Router>
  //     <Landing path="/" />
  //     <AccessDenied path="/access_denied" />
  //     <Profile path="/profile" />
  //     <SingleSnippet path="/snippets/:shareId" />
  //     <Login path="/login" />
  //     <SlackAuthenticator path="/slack/auth" />
  //   </Router>
  // )
}

export default App;