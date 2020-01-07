import React from 'react';
// import './App.css';
import { Router } from "@reach/router";
import Default from "./components/Default";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"
import SnippetList from "./components/List"
import MainLayout from "./views/layout";
import WrapRootElement from "./utils/wrapper/wrap-root-element"



function App() {
  return (
      <MainLayout>
        <Router>
            <PrivateRoute path="/app/list" component={SnippetList} />
            <Login path="/app/login" />
            <Default path="/app" />
        </Router>
      </MainLayout>
  );
}

export default App;
