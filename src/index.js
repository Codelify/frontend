import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { WrapRootElement } from "./utils/wrapper/wrap-root-element";
import {
  LocationProvider
} from '@reach/router' 


ReactDOM.render(
  <WrapRootElement>
    <LocationProvider>
      <App />
    </LocationProvider>
  </WrapRootElement>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
