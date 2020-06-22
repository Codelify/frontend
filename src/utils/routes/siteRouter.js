import React from "react";

import { Route, Switch } from "react-router";

export default (
  <Switch>
    <Route path="/" />
    <Route path="/access_denied" />
    <Route path="/view/snippet/:shareId" />
    <Route path="/view/twit/:shareId" />
    <Route path="/login" />
    <Route path="/slack/auth" />
    <Route path="/github/auth" />
  </Switch>
);
