import React from "react";
import { Box } from "@chakra-ui/core";
import CodeSnippet from "./CodeSnippet";
import MainLayout from "../views/layout";

const SnippetList = props => {
  const { data } = props;

  return (
    <MainLayout>
      <Box mt="60px">
        {data &&
          data.map(snippet => (
            <CodeSnippet
              key={snippet.id}
              id={snippet.id}
              title={snippet.title}
              description={snippet.description}
              content={snippet.content}
              tags={snippet.tags}
              url={snippet.sourceUrl}
            />
          ))}
      </Box>
    </MainLayout>
  );
};

export default SnippetList;
