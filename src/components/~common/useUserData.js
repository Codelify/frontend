import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { USER_DETAILS } from "../../graphql/query";

function useDataFetching() {
  const [results, setResults] = useState([]);

  const token = window.localStorage.getItem("token");
  const { data, loading, error } = useQuery(USER_DETAILS, {
    variables: { token }
    //pollInterval: 10000
  });

  useEffect(() => {
    fetchData();
  }, [data, loading, error]);

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
