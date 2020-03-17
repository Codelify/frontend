import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
} from "@chakra-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SNIPPET, UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";

const SnippetMenuModal = ({ restoreSnippet, isOpen, onClose, id, state, dispatch }) => {
const [updateSnippet] = useMutation(UPDATE_SNIPPET);
const [loading, setLoading] = useState(false);
const [deleteSnippet, data] = useMutation(DELETE_SNIPPET);
const toast = useToast();

const handleRestoreSnippet = async token => {
    try {
    setLoading(true);
    // eslint-disable-next-line no-empty-pattern
    const {} = await updateSnippet({
        variables: {
        snippetId: id,
        snippetInfo: { archivedAt: null },
        token: token
        },
        refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
    });
    setLoading(false);
    toast({
        position: "top-right",
        title: "Restore",
        description: "Your snippet has been successfully restored",
        status: "success",
        duration: 9000,
        isClosable: true
    });
    } catch (error) {
    setLoading(false);
    console.log(error);
    }
};

const handleDeleteSnippet = async token => {
    try {
    const { data } = await deleteSnippet({
        variables: {
        snippetId: id,
        token,
        archive: state.currentView === "FiArchive" ? false : true
        },
        refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
    });

    dispatch({ type: "DELETE_SNIPPET", payload: id });
    !data.loading && onClose(false);
    toast({
        position: "top-right",
        title: state.currentView === "FiArchive" ? "Delete" : "Update",
        description:
        state.currentView === "FiArchive"
            ? "Your snippet has been successfully deleted"
            : "Your snippet has been successfully archived ",
        status: "success",
        duration: 9000,
        isClosable: true
    });
    } catch (error) {
    console.log(error);
    }
};

const handleSnippetMutation = async () => {
    const token =
    typeof window !== "undefined" && window.localStorage.getItem("token");
    if (token) {
    if (restoreSnippet) {
        handleRestoreSnippet(token);
    } else {
        handleDeleteSnippet(token);
    }
    }
};

return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="5px">
        <ModalHeader>
            {state.currentView === "FiArchive"
            ? restoreSnippet
                ? "This will restore the Snippet"
                : "This will delete your Snippet"
            : "This will archive this Snippet"}
        </ModalHeader>
        <ModalCloseButton _focus={{ outline: "none" }} />
        <ModalBody>Do you want to continue ?</ModalBody>
        <ModalFooter>
            <Button variantColor="teal" mr={3} onClick={onClose}>
            Cancel
            </Button>
            <Button
            onClick={handleSnippetMutation}
            isLoading={loading || data.loading}
            >
            Yes
            </Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
    );
};

export default SnippetMenuModal;