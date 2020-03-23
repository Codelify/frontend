import React from "react";
import MainLayout from "../layouts/layout";
import Spinner from "./~common/Spinner";
import NoSnippetView from "./NoSnippetsView";

const EmptyView = ({ loading }) => {
  return (
    <MainLayout>
      {loading ? <Spinner /> : <NoSnippetView loading={loading} />}
    </MainLayout>
  );
};

export default EmptyView;
