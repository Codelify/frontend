import React, { useState } from "react";
import {
    Box,
    Flex,
    useColorMode,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Button,
    Heading,
    Spinner
} from "@chakra-ui/core";
import CodeLangageBar from "../components/CodeLangageBar";
import SnippetContent from "../components/SnippetContent"
import SnippetContext from "../context/SnippetContext";
import { useQuery } from "@apollo/react-hooks";
import { GET_SNIPPET } from "../graphql/query";

const SingleSnippet = ({ shareId, isOpen, onClose, size }) => {
    const snippetId = shareId;
    const { colorMode } = useColorMode();
    const disableEdit = true;
    const { data, loading } = useQuery(GET_SNIPPET, {
        variables: { snippetId }
    });
    const [isTwitting, setIsTwitting] = useState(false);

return (
<Modal 
    onClose={onClose} 
    size={size} 
    isOpen={isOpen}
    scrollBehavior="inside"
>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader >
            <Heading textAlign="center">Share on Twitter</Heading>
        </ModalHeader>
        <ModalCloseButton _focus={{outline:"none"}} />
        <ModalBody>
        <Box>
            {loading ? (
            <Spinner />
            ) : (
            <>
                <Flex
                    id={`post-img-${data.getSnippetDetails.id}`}
                    w="900px"
                    p="50px"
                    m="auto"
                    justifyContent="center" 
                    backgroundColor={ colorMode === "light" ? "#FAFAFA" : "#1c222f" }
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
        </ModalBody>
        <ModalFooter>
        <Button 
            _focus={{ outline: "none" }} 
            variantColor="teal" 
            mr={3} 
            isLoading={isTwitting}
            loadingText="Twitting"
        >
            Share
            </Button>
            <Button _focus={{ outline: "none" }} onClick={onClose}>Cancel</Button>    
        </ModalFooter>
    </ModalContent>
</Modal>    
    );
};

export default SingleSnippet;