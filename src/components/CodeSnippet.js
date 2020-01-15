import React, { useContext, useState } from "react";
import { AppContext } from "../utils/AppProvider";
import {
  Box,
  Flex,
  Stack,
  Link,
  Icon,
  Badge,
  Divider,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  ButtonGroup
} from "@chakra-ui/core";
import SnippetHeading from "./SnippetHeading";
import Description from "./SnippetDescription";
import { MdDelete, MdMoreHoriz } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SNIPPET, UPDATE_SNIPPET } from "../graphql/mutation";
import SnippetContent from "./SnippetContent";

const CodeSnippet = ({ title, id, description, url, tags, content }) => {
  // const ControlButtons = () => {
  //   return (
  //     <ButtonGroup mb="10px" justifyContent="center" size="sm">
  //       <Button variantColor="teal">Save</Button>
  //       <IconButton icon="close" />
  //     </ButtonGroup>
  //   );
  // };

  const [titleToUpdate, setTitleToUpdate] = useState(title);
  const [descriptionToUpdate, setDescroptionToUpdate] = useState(description);
  const { dispatch } = useContext(AppContext);
  const [deleteSnippet] = useMutation(DELETE_SNIPPET);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);

  const toast = useToast();
  const handleDelete = async () => {
    const token =
      typeof window !== "undefined" && window.localStorage.getItem("token");
    if (token) {
      try {
        const { data, error } = await deleteSnippet({
          variables: { snippetId: id, token }
        });
        dispatch({ type: "DELETE_SNIPPET", payload: id });
        onClose(false);
        toast({
          position: "top-right",
          title: "Archived",
          description: "Your snippet has been successfully archived",
          status: "success",
          duration: 9000,
          isClosable: true
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleUpdate = async typeOfAction => {
    const costumObject = {};
    if (typeOfAction === "title") {
      costumObject[typeOfAction] = titleToUpdate;
    }
    if (typeOfAction === "description") {
      costumObject[typeOfAction] = descriptionToUpdate;
    }
    const token = window.localStorage.getItem("token");
    const { data, loading } = await updateSnippet({
      variables: {
        snippetId: id,
        snippetInfo: costumObject,
        token: token
      }
    });
    console.log(data, loading);
  };

  const handleEdit = (event, typeOfAction) => {
    let state = event.target.value;
    console.log(typeOfAction);
    switch (typeOfAction) {
      case "title":
        setTitleToUpdate(state);
        break;
      case "description":
        setDescroptionToUpdate(state);
        break;
      default:
        return;
    }
  };

  const styledEdit = event => {
    document.getElementById(event.target.id).classList.add("edited-div");
  };

  return (
    <>
      <Flex flexWrap="wrap" mt="30px">
        <Stack
          mr="15px"
          minWidth="310px"
          w={["100%", "100%", "100%", "35%"]}
          spacing="14px"
        >
          <SnippetHeading
            id={id}
            title={titleToUpdate}
            handleEdit={handleEdit}
            styledEdit={styledEdit}
            handleUpdate={handleUpdate}
          />

          <Description
            id={id}
            description={descriptionToUpdate}
            handleEdit={handleEdit}
            styledEdit={styledEdit}
            handleUpdate={handleUpdate}
          />
          <Box>
            {url && (
              <Link color="teal.500" href={url} isExternal>
                Link <Icon name="external-link" mx="2px" />
              </Link>
            )}
          </Box>
          <Stack justify="flex-start" isInline>
            {tags &&
              tags.map((tag, index) => {
                return (
                  <Badge
                    key={`${tag.name} - ${index}`}
                    mb="4px"
                    mr="4px"
                    variantColor="green"
                  >
                    {tag}
                  </Badge>
                );
              })}
          </Stack>
        </Stack>
        <Box
          minWidth="310px"
          w={["100%", "100%", "100%", "60%"]}
          borderRadius="5px"
        >
          <SnippetContent
            content={content}
            id={id}
            handleEdit={handleEdit}
            //ControlButtons={ControlButtons}
          />
        </Box>
      </Flex>
      <Flex mt="40px" justify="flex-end" w="95%">
        <IconButton
          mr="3px"
          variant="ghost"
          variantColor="teal"
          aria-label="Delete Snippet"
          fontSize="25px"
          icon={MdDelete}
          onClick={onOpen}
          color="#FEB2B2"
          _focus={{
            outline: "none"
          }}
        />
        <IconButton
          aria-label="More options"
          fontSize="20px"
          icon={MdMoreHoriz}
          _focus={{
            outline: "none"
          }}
        />
      </Flex>
      <Divider />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="5px">
          <ModalHeader>This will archive this Snippet</ModalHeader>
          <ModalCloseButton _focus={{ outline: "none" }} />
          <ModalBody>Do you want to continue ?</ModalBody>
          <ModalFooter>
            <Button variantColor="teal" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CodeSnippet;
