import React, { useState } from "react";
//import { AppContext } from "../utils/AppProvider";
import {
  Box,
  Flex,
  Stack,
  Link,
  Icon,
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
  useToast
} from "@chakra-ui/core";
import SnippetHeading from "./SnippetHeading";
import Description from "./SnippetDescription";
import SnippetTags from "./SnippetTags";
import { MdDelete, MdMoreHoriz } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SNIPPET, UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";
import SnippetContent from "./SnippetContent";

const CodeSnippet = ({ title, id, description, url, tags, content }) => {
  //moved ControlButtons in each filed - so we can know whitch field user wants to update
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
  const [contentToUpdate, setContentToUpdate] = useState(content);
  //const { dispatch } = useContext(AppContext);
  const [deleteSnippet, data] = useMutation(DELETE_SNIPPET);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const toast = useToast();

  const handleDelete = async () => {
    const token =
      typeof window !== "undefined" && window.localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await deleteSnippet({
          variables: { snippetId: id, token },
          refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
        });

        //dispatch({ type: "DELETE_SNIPPET", payload: id });
        data.loading && onClose(false);
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
  const handleUpdate = async (tagList, typeOfAction) => {
    const costumObject = {};
    //construct costum object for every case for not repeting the mutation of each field
    if (typeOfAction === "title") {
      costumObject[typeOfAction] = titleToUpdate;
    }
    if (typeOfAction === "description") {
      costumObject[typeOfAction] = descriptionToUpdate;
    }
    if (typeOfAction === "content") {
      costumObject[typeOfAction] = contentToUpdate;
    }

    const token = window.localStorage.getItem("token");
    try {
      const { data } = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: costumObject,
          token: token
        },
        refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
      });
    } catch (error) {
      console.log(error);
    }
    //console.log(data,error, loading);
  };

  const handleEdit = (event, typeOfAction) => {
    // Case we update the code from Live Provider
    // event from LiveProvider its comming as a string in transformCode prop
    if (typeof event === "string") {
      setContentToUpdate(event);
    }

    //Case we update the code from title/description - onChange function
    // we have to verify if event its not a string or it has a target property
    let state = event.target && event.target.value;
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

          <SnippetTags id={id} tags={tags} />
        </Stack>
        <Box
          minWidth="310px"
          w={["100%", "100%", "100%", "60%"]}
          borderRadius="5px"
        >
          <SnippetContent
            content={contentToUpdate}
            id={id}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
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
            <Button onClick={handleDelete} isLoading={data.loading}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CodeSnippet;
