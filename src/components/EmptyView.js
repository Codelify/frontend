import React from "react";
import { Text, Box, IconButton, useDisclosure } from "@chakra-ui/core";
import NewSnippet from "./NewSnippet";
import { MdAddCircle } from "react-icons/md";
import { FaRegSadTear } from "react-icons/fa";
import MainLayout from "../views/layout";
import Spinner from "./~common/Spinner";

const EmptyView = ({ loading }) => {
  const [size, setSize] = React.useState("md");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
    document.getElementById("FiHome").focus();
  };

  return (
    <MainLayout>
      {loading ? (
        <Spinner />
      ) : (
        <Box w="100%" mt="120px" textAlign="center">
          <Box mx="auto" as={FaRegSadTear} size="60px" color="#F56565" />
          <Text textColor="teal" fontSize="4xl" color="teal">
            No snippets yet
          </Text>
          <Text fontSize="xl" opacity="0.6">
            Add your first snippets
          </Text>
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
        </Box>
      )}

      <NewSnippet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        firstField={firstField}
        size={size}
        setSize={setSize}
      />
    </MainLayout>
  );
};

export default EmptyView;
