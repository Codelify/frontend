import React, { useState } from "react";
import { Box, useColorMode } from "@chakra-ui/core";
import CodeSnippet from "./CodeSnippet";
import MainLayout from "../views/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import NoSnippetView from "./NoSnippetsView";
import SnippetContext from '../context/SnippetContext'


const SnippetList = props => {
  const { colorMode } = useColorMode();
  const [snippetPerPage, setSnippetsPerPage] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const { currentView, data } = props;
  const dataToRender = data && data.slice(0, snippetPerPage);
  
  const disableEdit = false;
  //fetch more snippets from database
  const fetchMoreData = () => {
    if (dataToRender.length === data.length) {
      setHasMore(false);
    }
    //simulate loading/fetch snippets from database
    setTimeout(() => {
      setSnippetsPerPage(snippetPerPage + 4);
    }, 500);
  };

  if (data && data.length === 0) {
    return (
      <MainLayout>
        <NoSnippetView currentView={currentView} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box
        px={["10px", "10px", "10px", "20px"]}
        borderRadius="10px"
        backgroundColor={
          colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
        }
        mt="50px"
        py="40px"
      >
        <InfiniteScroll
          dataLength={snippetPerPage}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <SnippetContext.Provider value={disableEdit}>
          {dataToRender &&
            dataToRender.map((snippet, index) => {
              return (
                <CodeSnippet
                  index={index}
                  key={snippet.id}
                  id={snippet.id}
                  title={snippet.title}
                  description={snippet.description}
                  content={snippet.content}
                  tags={snippet.tags}
                  url={snippet.sourceUrl}
                  isFav={snippet.isFav}
                  isArchived={snippet.archivedAt}
                  shareId={snippet.shareId}
                  isPublic={snippet.isPublic}
                />
              );
            })}
            </SnippetContext.Provider>
        </InfiniteScroll>
      </Box>
    </MainLayout>
  );
};

export default SnippetList;
