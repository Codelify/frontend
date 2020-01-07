import React from "react";
// import './App.css';
import Default from "./components/Default";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import SnippetList from "./components/List";
import MainLayout from "./views/layout";
import { Router } from "@reach/router";

function App() {
  return (
    <MainLayout>
      <Router>
        <PrivateRoute path="/app/list" component={SnippetList} />
        <Login path="/app/login" />
        <Default exact path="/" component={Default} />
      </Router>
    </MainLayout>
  );
}

export default App;
