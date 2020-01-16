import React, { useContext, useEffect } from "react";
import { AppContext } from "../utils/AppProvider";
import EmptyView from "./EmptyView";
import SnippetList from "./List";
import { useQuery } from "@apollo/react-hooks";
import { MY_SNIPPETs } from "../graphql/query";

const Default = () => {
  const { state, dispatch } = useContext(AppContext);
  const token =
    typeof window !== "undefined" && window.localStorage.getItem("token");
  const { data, loading } = useQuery(MY_SNIPPETs, {
    variables: { token }
  });

  useEffect(() => {
    fetchSnippetsData();
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
    return <SnippetList dat a={state.filteredSnippets} />;
  }

  // Render the list of snippets if their are any
  if (state.snippetsData && state.snippetsData.length && token) {
    return <SnippetList data={state.snippetsData} loading={loading} />;
  }
  // default view if there is no snippets
  else {
    return <EmptyView loading={loading} />;
  }
};

export default Default;
