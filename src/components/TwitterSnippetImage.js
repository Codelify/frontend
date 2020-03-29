import React from "react";
import {
    Box,
    Flex,
    useColorMode,
    ThemeProvider,
    CSSReset,
    Spinner
} from "@chakra-ui/core";
import CodeLangageBar from "../components/CodeLangageBar";
import SnippetContent from "../components/SnippetContent"
import SnippetContext from "../context/SnippetContext";
import { useQuery } from "@apollo/react-hooks";
import { GET_SNIPPET } from "../graphql/query";

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
        <Box pt="100px">
            {loading ? (
            <Spinner />
            ) : (
            <>
                <Flex 
                    id={`post-img-${data.getSnippetDetails.id}`}
                    w="900px"
                    m="auto"
                    py="40px"
                    px="60px"
                    borderRadius="10px"
                    justifyContent="center" 
                    backgroundColor={ colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)" }
                >
                    {/* <SnippetContext.Provider value={disableEdit}>
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
                    </SnippetContext.Provider> */}

                    <SnippetContext.Provider value={disableEdit}>
                    <Box
                    w="100%"
                    borderRadius="5px"
                    >
                    <Box
                        py="0px"
                        pl="10px"
                        style={{
                        whiteSpace: "nowrap",
                        overflow: "auto",
                        opacity: "0.96",
                        background:
                            "linear-gradient(to bottom, transparent 50%, #051525 50%)"
                        }}
                    >
                        <CodeLangageBar 
                            codeLangage={data.getSnippetDetails.lang}
                        />
                    </Box>
                    <SnippetContent
                        content={data.getSnippetDetails.content}
                        id={data.getSnippetDetails.id}
                        isFav={data.getSnippetDetails.isFav}
                        codeLangage={data.getSnippetDetails.lang}
                    />
                    </Box>
                    </SnippetContext.Provider>
                </Flex>
            </>
            )}
        </Box>
        </ThemeProvider>
    );
};

export default SingleSnippet;