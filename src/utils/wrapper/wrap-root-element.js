// Top level wrapper that provide apollo client
// and chakraUI

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import { client } from "./apollo-client";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import AppProvider from "../AppProvider";

export const WrapRootElement = ({ props, children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <ColorModeProvider value="light" {...props}>
          <CSSReset />
          <AppProvider>{children}</AppProvider>
        </ColorModeProvider>
      </ThemeProvider>
      <ToastContainer autoClose={3000} position="top-right" hideProgressBar />
    </ApolloProvider>
  );
};
