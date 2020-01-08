import React, { useContext } from "react";
import { AppContext } from "../utils/AppProvider";
import EmptyView from "./EmptyView";
import SnippetList from "./List";

const Default = () => {
  const { state } = useContext(AppContext);
  const token = window.localStorage.getItem("token");

  //Render filterd Snippets if there are any
  if (state.filteredSnippets) {
    return <SnippetList data={state.filteredSnippets} />;
  }

  // Render the list of snippets if their are any
  if (state.snippetsData && state.snippetsData.length && token) {
    return <SnippetList data={state.snippetsData} search="22" />;
  }
  // default view if there is no snippets
  else {
    return <EmptyView />;
  }
};

export default Default;
