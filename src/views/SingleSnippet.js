import React from "react";
import { 
    Box, 
    Flex, 
    useColorMode,
    ThemeProvider,
    CSSReset
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

    const { data } = useQuery(GET_SNIPPET, {
        variables: { snippetId },
    });    
    const snippet = data.getSnippetDetails

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
                <CodeSnippet
                    index={0}
                    key={snippet.id}
                    id={snippet.id}
                    title={snippet.title}
                    description={snippet.description}
                    content={snippet.content}
                    tags={snippet.tags}
                    url={snippet.sourceUrl}
                    isFav={snippet.isFav}
                    isArchived={snippet.archivedAt}
                    shareId={snippetId}
                />
            </SnippetContext.Provider>
            </Box>
        </Flex>
        <Footer />
    </Box>
    </ThemeProvider>
    );
};

export default SingleSnippet;