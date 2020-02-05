import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { USER_DETAILS } from "../../graphql/query";

function useDataFetching() {
  // const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  // const [error, setError] = useState("");

  const token = window.localStorage.getItem("token");
  const { data, loading, error, refetch } = useQuery(USER_DETAILS, {
    variables: { token },
    pollInterval: 10000
  });
  console.log(loading);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { getUserDetails } = await data;
      setResults(getUserDetails);
      //dispatch({ type: "FETCH_SNIPPETS_DATA", payload: getAuthUserSnippets });
    } catch (error) {
      //console.warn(error);
    }
  };

  return {
    error,
    loading,
    results,
    data
  };
}

export default useDataFetching;
