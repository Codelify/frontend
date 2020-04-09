import React, { useContext, useEffect, useCallback } from "react";
import {
  Skeleton
} from "@chakra-ui/core";
import { AppContext } from "../context/AppContext";
import MainLayout from "../layouts/AppLayout";
import SnippetList from "./List";
import { useQuery } from "@apollo/react-hooks";
import { MY_SNIPPETs } from "../graphql/query";
import { PageView, initGA } from "./~common/Tracking";
import config from "../utils/config";
import Spinner from "./~common/Spinner";

const Default = () => {
  const { state, dispatch } = useContext(AppContext);
  //console.log("Menu View", state.currentView);
  const token = typeof window !== "undefined" && window.localStorage.getItem("token");
  const { data, loading, refetch } = useQuery(MY_SNIPPETs, {
    variables: { token },
    //fetchPolicy: "no-cache",
    // fetchPolicy: "cache-and-network",
    pollInterval: 10000
  });

  useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
    PageView();
  }, [state.currentView]);

  const fetchSnippetsData = useCallback(async () => {
    try {
      const { getAuthUserSnippets } = await data;
      dispatch({ type: "FETCH_SNIPPETS_DATA", payload: getAuthUserSnippets });
    } catch (error) {
      //console.warn(error);
    }
  }, [data, dispatch]);

  useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
    PageView();
    fetchSnippetsData();
    refetch();
  }, [data, loading, fetchSnippetsData, refetch]);

  //Render filterd Snippets if there are any
  if (state.filteredSnippets) {
    return <SnippetList data={state.filteredSnippets} />;
  }

  if(loading){
    return (
      <MainLayout>
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
      </MainLayout>
    )
  }
  // Render the list of snippets if their are any depends on the current side navigation menu
  else {
    if (state.currentView === "FiHome") {
      return (
        <SnippetList
          currentView={state.currentView}
          data={state.snippetsData}
          loading={loading}
        />
      );
    }
    if (state.currentView === "FiArchive") {
      return (
        <SnippetList
          currentView={state.currentView}
          data={state.archivedSnippets}
          loading={loading}
        />
      );
    }
    if (state.currentView === "FiStar") {
      return (
        <SnippetList
          currentView={state.currentView}
          data={state.favoritesSnippets}
          loading={loading}
        />
      );
    }
    if (state.currentView === "FiTag") {
      return (
        <SnippetList
          currentView={state.currentView}
          data={state.snippetsData}
          loading={loading}
        />
      );
    }
  }
};

export default Default;
