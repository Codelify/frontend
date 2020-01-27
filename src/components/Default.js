import React, { useContext, useEffect } from "react";
import { AppContext } from "../utils/AppProvider";
import EmptyView from "./EmptyView";
import SnippetList from "./List";
import { useQuery } from "@apollo/react-hooks";
import { MY_SNIPPETs } from "../graphql/query";
import { initGA, PageView } from "./~common/Tracking";

const Default = () => {
  const { state, dispatch } = useContext(AppContext);

  const token =
    typeof window !== "undefined" && window.localStorage.getItem("token");
  const { data, loading, refetch } = useQuery(MY_SNIPPETs, {
    variables: { token },
    //fetchPolicy: "no-cache",
    // fetchPolicy: "cache-and-network",
    pollInterval: 10000
  });

  useEffect(() => {
    //initGA("UA-157102662-1");
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
