import React, { useState } from "react";
import { Box } from "@chakra-ui/core";
import CodeSnippet from "./CodeSnippet";
import MainLayout from "../views/layout";
import InfiniteScroll from "react-infinite-scroll-component";

const SnippetList = props => {
  const [snippetPerPage, setSnippetsPerPage] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const { data } = props;
  const dataToRender = data.slice(0, snippetPerPage);
  console.log("Data to Render", dataToRender);

  const fetchMoreData = () => {
    if (dataToRender.length === data.length) {
      setHasMore(false);
    }
    setTimeout(() => {
      setSnippetsPerPage(snippetPerPage + 3);
    }, 500);
  };
  return (
    <MainLayout>
      <Box mt="60px">
        <InfiniteScroll
          dataLength={snippetPerPage}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen all Snippets 👋</b>
            </p>
          }
        >
          {dataToRender &&
            dataToRender.map((snippet, idx) => {
              return (
                <CodeSnippet
                  key={snippet.id}
                  id={snippet.id}
                  title={snippet.title}
                  description={snippet.description}
                  content={snippet.content}
                  tags={snippet.tags}
                  url={snippet.sourceUrl}
                />
              );
            })}
        </InfiniteScroll>
      </Box>
    </MainLayout>
  );
};

export default SnippetList;
