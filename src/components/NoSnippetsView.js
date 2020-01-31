import React from "react";
import { Text, Box, IconButton, useDisclosure } from "@chakra-ui/core";
import NewSnippet from "./NewSnippet";
import { MdAddCircle } from "react-icons/md";
import { FaRegSadTear, FaRegStar } from "react-icons/fa";
import { FiArchive } from 'react-icons/fi'

const NoSnippetView = ({ currentView, loading }) => {
  const [size, setSize] = React.useState("md");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
    document.getElementById("FiHome").focus();
  };


  let emptyData = {
    text: "You have no snippets yet",
    icon: FaRegSadTear,
    actionText: "Add your first snippets"
  }
  if(currentView === "FiArchive"){
    emptyData.text = "Your archive is currently empty";
    emptyData.icon = FiArchive;
    emptyData.actionText = ""
  }
  else if(currentView === "FiStar"){
    emptyData.text = "You don’t have any favorites snippets yet";
    emptyData.icon = FaRegStar;
    emptyData.actionText = ""
  }

  return (
    <>
      <Box h="80vh" pt="120px" w="100%" textAlign="center">
        <Box mx="auto" as={emptyData.icon} size="60px" color="#FC8181" />
        <Text textColor="teal" fontSize="2xl" color="teal">
          {emptyData.text}
        </Text>
        <Text fontSize="xl" opacity="0.6">
        {emptyData.actionText}
        </Text>
        {
          currentView === "FiHome" && (
            <IconButton
            variant="ghost"
            ml="5px"
            aria-label="Add new snippet"
            fontSize="30px"
            variantColor="teal"
            icon={MdAddCircle}
            onClick={() => {
              handleClick("full");
            }}
            _focus={{
              outline: "none"
            }}
          />  
          )
        }
      </Box>
      <NewSnippet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        firstField={firstField}
        size={size}
        setSize={setSize}
      />
    </>
  );
};

export default NoSnippetView;
