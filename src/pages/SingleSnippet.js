import React from "react";
import {
  Box,
  Flex,
  useColorMode,
  ThemeProvider,
  CSSReset,
  Spinner
} from "@chakra-ui/core";
import Header from "../components/Elements/Header/Header";
import UserBio from "../components/UserBio";
import Footer from "../components/Elements/Footer";
import CodeSnippet from "../components/Snippet/CodeSnippet";
import SnippetContext from "../context/SnippetContext";
import { useQuery } from "@apollo/react-hooks";
import { GET_SNIPPET } from "../graphql/query";
import isLoggedIn from "../utils/auth";

const SingleSnippet = props => {
  const snippetId = props.shareId;
  const { colorMode } = useColorMode();
  const disableEdit = true;

  const { data, loading } = useQuery(GET_SNIPPET, {
    variables: { snippetId }
  });

  return (
    <ThemeProvider>
      <CSSReset />
      <Header appView={false} landing={false} isLoggedIn={isLoggedIn()} />
      <Box pt="100px">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <UserBio owner={data.getSnippetDetails.owner} />
            <Flex align="center" justifyContent="center" w="100%">
              <Box
                w="90%"
                px={["10px", "10px", "10px", "20px"]}
                borderRadius="10px"
                backgroundColor={
                  colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
                }
                mt="50px"
                py="40px"
              >
                <SnippetContext.Provider value={disableEdit}>
                  <CodeSnippet
                    index={0}
                    key={data.getSnippetDetails.id}
                    id={data.getSnippetDetails.id}
                    title={data.getSnippetDetails.title}
                    description={data.getSnippetDetails.description}
                    content={data.getSnippetDetails.content}
                    tags={data.getSnippetDetails.tags}
                    url={data.getSnippetDetails.sourceUrl}
                    lang={data.getSnippetDetails.lang}
                    isFav={data.getSnippetDetails.isFav}
                    isArchived={data.getSnippetDetails.archivedAt}
                    shareId={snippetId}
                  />
                </SnippetContext.Provider>
              </Box>
            </Flex>
          </>
        )}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default SingleSnippet;
