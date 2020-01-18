import React from "react";
import { Box } from "@chakra-ui/core";
import CodeSnippet from "./CodeSnippet";
import MainLayout from "../views/layout";
import Spinner from "./~common/Spinner";
import EmptyView from "./EmptyView";

const SnippetList = props => {
  const { data, loading } = props;

  return (
    <MainLayout>
      <Box mt="60px">
      {loading && <Spinner />}
        {data && data.getAuthUserSnippets.length ?
          data.getAuthUserSnippets.map(snippet => (
            <CodeSnippet
              key={snippet.id}
              id={snippet.id}
              title={snippet.title}
              description={snippet.description}
              content={snippet.content}
              tags={snippet.tags}
              url={snippet.sourceUrl}
            />
          )) : <EmptyView />}
      </Box>
    </MainLayout>
  );
};

export default SnippetList;
