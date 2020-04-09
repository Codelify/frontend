import React, { useEffect } from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import Default from "./components/Default";
import Login from "./components/Login";
import Landing from "./pages/Landing";
import AccessDenied from "./pages/AccessDenied";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import SingleSnippet from "./pages/SingleSnippet";
import TwitterSnippetImage from "./components/TwitterSnippetImage";
import { Router } from "@reach/router";
import SlackAuthenticator from "./components/SlackAuthenticator";
import { initGA } from "./components/~common/Tracking";
import config from "./utils/config";
import isLoggedIn from "./utils/auth";
import { useLocation } from "@reach/router";
import favicon16 from "./assets/img/codelify-ico.ico";

import GitHubAuthenticator from "./components/GitHubAuthenticator";
function App() {
  useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
  }, []);
  const auth = isLoggedIn();
  const location = useLocation();

  const NotFound = () => {
    if (
      !auth &&
      (location.pathname === "/app" || location.pathname === "/profile")
    ) {
      return <AccessDenied />;
    } else return <PageNotFound />;
  };

  return (
    <>
      <Helmet link={[{ rel: "icon", href: favicon16, sizes: "16x16" }]} />
      <Router>
        {/* Public routes */}
        <Landing path="/" auth={auth} />
        <AccessDenied path="/access_denied" />
        <SingleSnippet path="/view/snippet/:shareId" />
        <TwitterSnippetImage path="/view/twit/:shareId" />
        <Login path="/login" />
        <SlackAuthenticator path="/slack/auth" />
        <GitHubAuthenticator path="/github/auth" />
        {auth && (
          // Protected routes
          <>
            <Default exact path="/app/:name" component={Default} />
            <Default exact path="/app" component={Default} />
            <Profile path="/profile" />
          </>
        )}
        {/* Not found or forbiden */}
        <NotFound default />
      </Router>
    </>
  );
}

export default App;