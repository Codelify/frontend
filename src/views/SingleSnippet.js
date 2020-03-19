import React from "react";
import { 
    Box, 
    Flex, 
    useColorMode,
    ThemeProvider,
    CSSReset,
    Spinner
} from "@chakra-ui/core";
import UserBio from '../components/UserBio'
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";
import SnippetContext from '../context/SnippetContext';
import { useQuery } from "@apollo/react-hooks";
import { GET_SNIPPET } from "../graphql/query";

const SingleSnippet = (props) => {
    
    const snippetId = props.shareId;
    const { colorMode } = useColorMode();
    const disableEdit = true;

    const { data, loading } = useQuery(GET_SNIPPET, {
        variables: { snippetId },
    });

    return (
    <ThemeProvider>
    <CSSReset />
    <Box pt="30px">
    <UserBio />
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
                {
                    loading ?
                    <Spinner /> :
                    <CodeSnippet
                    index={0}
                    key={data.getSnippetDetails.id}
                    id={data.getSnippetDetails.id}
                    title={data.getSnippetDetails.title}
                    description={data.getSnippetDetails.description}
                    content={data.getSnippetDetails.content}
                    tags={data.getSnippetDetails.tags}
                    url={data.getSnippetDetails.sourceUrl}
                    isFav={data.getSnippetDetails.isFav}
                    isArchived={data.getSnippetDetails.archivedAt}
                    shareId={snippetId}
                    />
                }

            </SnippetContext.Provider>
            </Box>
        </Flex>
        <Footer />
    </Box>
    </ThemeProvider>
    );
};

export default SingleSnippet;