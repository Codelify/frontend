import React, { useState, useContext } from "react";
import { AppContext } from "../utils/AppProvider";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  useDisclosure
} from "@chakra-ui/core";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaStar, FaArchive, FaWindowRestore } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SNIPPET, UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";

const SnippetMenu = ({ isFav, id }) => {
  const [restoreSnippet, setRestoreSnippet] = useState(false);
  const [favorite, setFavorite] = useState(isFav);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const [loading, setLoading] = useState(false);
  const [deleteSnippet, data] = useMutation(DELETE_SNIPPET);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, dispatch } = useContext(AppContext);
  const toast = useToast();

  const toggleFavorite = async () => {
    setFavorite(!favorite);
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: { isFav: !favorite },
          token: token
        },
        refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestoreSnippet = async token => {
    try {
      setLoading(true);
      const { data } = await updateSnippet({
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
    <>
      <Menu autoSelect={false}>
        <MenuButton _focus={{ outline: "none" }} as="div">
          <IconButton
            p="0px"
            size="xs"
            variant="ghost"
            variantColor="teal"
            aria-label="More options"
            fontSize="15px"
            icon={FiMoreHorizontal}
            _focus={{
              outline: "none"
            }}
          />
        </MenuButton>
        <MenuList placement="bottom-end">
          {state.currentView !== "FiArchive" && (
            <MenuItem
              onClick={toggleFavorite}
              as="div"
              style={{
                cursor: "pointer"
              }}
            >
              <IconButton
                variant="ghost"
                aria-label="Favorite Snippet"
                fontSize="22px"
                color="#FEB2B2"
                icon={FaStar}
                _focus={{
                  outline: "none"
                }}
              />
              {favorite ? "Remove from Favorite" : "Add to Favorite"}
            </MenuItem>
          )}
          {state.currentView === "FiArchive" && (
            <MenuItem
              onClick={() => {
                onOpen();
                setRestoreSnippet(true);
              }}
              as="div"
              style={{
                cursor: "pointer"
              }}
            >
              <IconButton
                variant="ghost"
                aria-label="Restore Snippet"
                icon={FaWindowRestore}
                color="#81E6D9"
                fontSize="20px"
                _focus={{
                  outline: "none"
                }}
              />
              Restore Snippet
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              onOpen();
              setRestoreSnippet(false);
            }}
            as="div"
            style={{
              cursor: "pointer"
            }}
          >
            <IconButton
              variant="ghost"
              aria-label="Delete Snippet"
              fontSize={state.currentView === "FiArchive" && "25px"}
              icon={state.currentView === "FiArchive" ? MdDelete : FaArchive}
              color="#CBD5E0"
              _focus={{
                outline: "none"
              }}
            />
            {state.currentView === "FiArchive"
              ? "Delete Snippet"
              : "Move to Archive"}
          </MenuItem>
        </MenuList>
      </Menu>
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
    </>
  );
};

export default SnippetMenu;
