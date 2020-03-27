import React, { useState } from "react";
import CodeSnippet from "./CodeSnippet";
import MainLayout from "../layouts/AppLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import SnippetContext from '../context/SnippetContext'
import EmptyView from "./EmptyView";


const SnippetList = props => {
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
        <EmptyView currentView={currentView} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
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
                  lang={snippet.lang}
                  isFav={snippet.isFav}
                  isArchived={snippet.archivedAt}
                  shareId={snippet.shareId}
                  isPublic={snippet.isPublic}
                />
              );
            })}
            </SnippetContext.Provider>
        </InfiniteScroll>
    </MainLayout>
  );
};

export default SnippetList;
