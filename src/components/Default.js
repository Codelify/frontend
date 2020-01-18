import React from "react";
import SnippetList from "./List";
import { useQuery } from "@apollo/react-hooks";
import { MY_SNIPPETs } from "../graphql/query";

const Default = () => {
 
  const token =
    typeof window !== "undefined" && window.localStorage.getItem("token");
  const { data, loading } = useQuery(MY_SNIPPETs, {
    variables: { token }
  });

  return <SnippetList data={data} loading={loading} />;
  
};

export default Default;
