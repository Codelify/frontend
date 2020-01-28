import React, { useContext, useEffect } from "react";
import { AppContext } from "../utils/AppProvider";
import EmptyView from "./EmptyView";
import SnippetList from "./List";
import { useQuery } from "@apollo/react-hooks";
import { MY_SNIPPETs } from "../graphql/query";
import { initGA, PageView } from "./~common/Tracking";

const Default = () => {
  const { state, dispatch } = useContext(AppContext);
  console.log("Archived Snippets", state.archivedSnippets);
  console.log("Menu View", state.currentView);
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
    fetchSnippetsData();
    refetch();
  }, [data, loading]);

  const fetchSnippetsData = async () => {
    try {
      const { getAuthUserSnippets } = await data;
      dispatch({ type: "FETCH_SNIPPETS_DATA", payload: getAuthUserSnippets });
      console.log(data && getAuthUserSnippets);
    } catch (error) {
      //console.warn(error);
    }
  };

  //Render filterd Snippets if there are any
  if (state.filteredSnippets) {
    return <SnippetList data={state.filteredSnippets} />;
  }

  // Render the list of snippets if their are any depends on the current side navigation menu view
  if (token) {
    if (state.currentView === "FiHome") {
      return <SnippetList data={state.snippetsData} loading={loading} />;
    }
    if (state.currentView === "FiArchive") {
      return <SnippetList data={state.archivedSnippets} loading={loading} />;
    }
    if (state.currentView === "FiStar") {
      return <SnippetList data={state.snippetsData} loading={loading} />;
    }
    if (state.currentView === "FiTag") {
      return <SnippetList data={state.snippetsData} loading={loading} />;
    }
  }
  // default view if there is no snippets
  else {
    return <EmptyView loading={loading} />;
  }
};

export default Default;
