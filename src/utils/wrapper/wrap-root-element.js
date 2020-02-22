// Top level wrapper that provide apollo client
// and chakraUI

import React from "react";
import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AppProvider from "../AppProvider";
import ApolloProvider from "./Apollo-Provider";

export const WrapRootElement = ({ props, children }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <ColorModeProvider {...props}>
          <CSSReset />
          <AppProvider>
          {children}
          </AppProvider>
        </ColorModeProvider>
      </ThemeProvider>
      <ToastContainer autoClose={3000} position="top-right" hideProgressBar />
    </ApolloProvider>
  );
};
