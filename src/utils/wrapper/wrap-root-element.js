// Top level wrapper that provide apollo client
// and chakraUI

import React from "react";
import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AppProvider from "../AppProvider";
import ApolloProvider from "./Apollo-Provider";

export const WrapRootElement = ({ children }) => {
  const colorMode =
    typeof window !== "undefined" && window.localStorage.getItem("darkMode");
  if (!colorMode) {
    window.localStorage.setItem("darkMode", false);
  }
  return (
    <ApolloProvider>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <AppProvider>{children}</AppProvider>
        </ColorModeProvider>
      </ThemeProvider>
      <ToastContainer autoClose={3000} position="top-right" hideProgressBar />
    </ApolloProvider>
  );
};
