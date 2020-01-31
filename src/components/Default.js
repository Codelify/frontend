import React, { useContext, useEffect } from "react";
import { AppContext } from "../utils/AppProvider";
import EmptyView from "./EmptyView";
import SnippetList from "./List";
import { useQuery } from "@apollo/react-hooks";
import { MY_SNIPPETs } from "../graphql/query";
import { PageView } from "./~common/Tracking";

const Default = () => {
  const { state, dispatch } = useContext(AppContext);
  //console.log("Menu View", state.currentView);
  const token =
    typeof window !== "undefined" && window.localStorage.getItem("token");
  const { data, loading, refetch } = useQuery(MY_SNIPPETs, {
    variables: { token },
    //fetchPolicy: "no-cache",
    // fetchPolicy: "cache-and-network",
    pollInterval: 10000
  });

  useEffect(() => {
    PageView();
  }, []);

  useEffect(() => {
    PageView();
    fetchSnippetsData();
    refetch();
  }, [data, loading]);

  const fetchSnippetsData = async () => {
    try {
      const { getAuthUserSnippets } = await data;
      dispatch({ type: "FETCH_SNIPPETS_DATA", payload: getAuthUserSnippets });
    } catch (error) {
      //console.warn(error);
    }
  };

  //Render filterd Snippets if there are any
  if (state.filteredSnippets) {
    return <SnippetList data={state.filteredSnippets} />;
  }

  // Render the list of snippets if their are any depends on the current side navigation menu
  if (token) {
    if (state.currentView === "FiHome") {
      return <SnippetList currentView={state.currentView} data={state.snippetsData} loading={loading} />;
    }
    if (state.currentView === "FiArchive") {
      return <SnippetList currentView={state.currentView} data={state.archivedSnippets} loading={loading} />;
    }
    if (state.currentView === "FiStar") {
      return <SnippetList currentView={state.currentView} data={state.favoritesSnippets} loading={loading} />;
    }
    if (state.currentView === "FiTag") {
      return <SnippetList currentView={state.currentView} data={state.snippetsData} loading={loading} />;
    }
  }
  // default view if there is no snippets
  else {
    return <EmptyView loading={loading} />;
  }
};

export default Default;
