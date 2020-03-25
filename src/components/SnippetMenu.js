import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Box
} from "@chakra-ui/core";
import SnippetMenuModal from './SnippetMenuModal'
import { FiMoreHorizontal } from "react-icons/fi";
import { FaStar, FaArchive, FaWindowRestore } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";

const SnippetMenu = ({ isFav, id }) => {
  const [restoreSnippet, setRestoreSnippet] = useState(false);
  const [favorite, setFavorite] = useState(isFav);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, dispatch } = useContext(AppContext);

  const toggleFavorite = async () => {
    setFavorite(!favorite);
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateSnippet({
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
            <MenuItem onClick={toggleFavorite}>
              <Box size="20px" mx="10px" as={FaStar} color="red.200" />
              <span>
                {favorite ? "Remove from Favorite" : "Add to Favorite"}
              </span>
            </MenuItem>
          )}
          {state.currentView === "FiArchive" && (
            <MenuItem
              onClick={() => {
                onOpen();
                setRestoreSnippet(true);
              }}            
            >
              <Box mx="10px" as={FaWindowRestore} color="teal.300" />
              <span>Restore Snippet</span>
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              onOpen();
              setRestoreSnippet(false);
            }}
          >
            {
              state.currentView === "FiArchive" 
              ? <Box size="25px" mx="10px" as={MdDelete} color="red.300" />
              : <Box mx="10px" as={FaArchive} color="teal.300" />
            }
            <span>{state.currentView === "FiArchive" ? "Delete Snippet" : "Move to Archive"}</span>
          </MenuItem>
        </MenuList>
      </Menu>
      <SnippetMenuModal {...{ restoreSnippet, isOpen, onClose, id, state, dispatch }} />
    </>
  );
};

export default SnippetMenu;
