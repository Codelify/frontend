import React, { useContext } from 'react';
import { AppContext } from '../utils/AppProvider';
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
} from '@chakra-ui/core';
import SnippetHeading from './SnippetHeading'
import Description from './SnippetDescription'
import { LiveProvider, LiveEditor } from 'react-live'; 
import theme from 'prism-react-renderer/themes/nightOwl';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_SNIPPET } from '../graphql/mutation';
import SnippetContent from './SnippetContent';

const CodeSnippet = ({ title, id, description, url, tags, content }) => {

  const ControlButtons = () => {
    return (
      <ButtonGroup mb="10px" justifyContent="center" size="sm">
        <Button variantColor="teal">
          Save
        </Button>
        <IconButton icon="close" />
      </ButtonGroup>      
    );
  }

  const snippetPlaceHolder = `${content}`;
  const { dispatch } = useContext(AppContext);
  const [deleteSnippet] = useMutation(DELETE_SNIPPET);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const handleDelete = async () => {
    const token =
      typeof window !== 'undefined' && window.localStorage.getItem('token');
    if (token) {
      try {
        const { data, error } = await deleteSnippet({
          variables: { snippetId: id, token },
        });
        dispatch({ type: 'DELETE_SNIPPET', payload: id });
        onClose(false);
        toast({
          position: "top-right",
          title: "Archived",
          description: "Your snippet has been successfully archived",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (event) => {
    console.dir(event.target.value)
  }

  const styledEdit = (event) => {
    document.getElementById(event.target.id).classList.add('edited-div');
  }

  return (
    <>
      <Flex flexWrap="wrap" mt="30px">
        <Stack
          mr="15px"
          minWidth="310px"
          w={['100%', '100%', '100%', '35%']}
          spacing="14px"
        >

          <SnippetHeading 
            id={id} 
            title={title} 
            handleEdit={handleEdit} 
            styledEdit={styledEdit} 
            ControlButtons={ControlButtons} 
          />

          <Description 
            id={id} 
            description={description} 
            handleEdit={handleEdit} 
            styledEdit={styledEdit} 
            ControlButtons={ControlButtons} 
          />
          <Box>
            {
              url && (
                <Link color="teal.500" href={url} isExternal>
                  Link <Icon name="external-link" mx="2px" />
                </Link>  
              )
            }
          </Box>
          <Stack justify="flex-start" isInline>
            {tags &&
              tags.map(tag => {
                return (
                  <Badge mb="4px" mr="4px" variantColor="green">{tag}</Badge>
                );
              })}
          </Stack>
        </Stack>
        <Box 
        minWidth="310px" 
        w={['100%', '100%', '100%', '60%']}
        borderRadius="5px"
        >
        <SnippetContent 
          content={content} 
          id={id} 
          handleEdit={handleEdit} 
          ControlButtons={ControlButtons} 
        />
        </Box>
      </Flex>
      <Flex mt="20px" justify="flex-end" w="100%">
        <IconButton
          variant="ghost"
          variantColor="teal"
          aria-label="Delete Snippet"
          fontSize="25px"
          icon={MdDelete}
          color="#FEB2B2"
          onClick={onOpen}
          _focus={{
            outline: 'none',
          }}
        />
      </Flex>
      <Divider />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="5px" >
          <ModalHeader>This will archive this Snippet</ModalHeader>
          <ModalCloseButton _focus={{outline: 'none'}}/>
          <ModalBody>Do you want to continue ?</ModalBody>
          <ModalFooter>
            <Button variantColor="teal" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CodeSnippet;
