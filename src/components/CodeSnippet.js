import React, { useContext, useState } from 'react';
import { AppContext } from '../utils/AppProvider';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
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
  Collapse,
  ButtonGroup
} from '@chakra-ui/core';
import Description from './SnippetDescription'
import { LiveProvider, LiveEditor } from 'react-live';
import ContentEditable from 'react-contenteditable' 
import theme from 'prism-react-renderer/themes/nightOwl';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_SNIPPET } from '../graphql/mutation';

const CodeSnippet = ({ title, id, description, url, tags, content }) => {

  const ControlButtons = () => {
    return (
      <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon="check" />
      <IconButton icon="close" />
      </ButtonGroup>      
    );
  }

  const snippetPlaceHolder = `${content}`;
  const titleId = `title_${id}`;
  //const descriptionId = `description_${id}`;
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

  const handleBlur = (event) => {
    console.dir(event.target.id);
    document.getElementById(event.target.id).classList.remove('edited-div');
    handleToggle(false);
  }

  const handleEdit = (value) => {
    console.dir("With this value " + value)
  }

  const styledEdit = (event) => {
    document.getElementById(event.target.id).classList.add('edited-div');
  }

  const [show, setShow] = useState(false);

  const handleToggle = (newShow) => {
    setShow(newShow);
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
          <Heading mb={0} as="h3" size="lg">
          <ContentEditable
              html={title}
              disabled={false}
              id={titleId}
              onBlur={handleBlur}
              onClick={()=>{
                handleToggle(true)
              }}
              onChange={handleEdit}
              onFocus={styledEdit}
              style={{
                outline: "none",
              }}
          />          
          </Heading>
          <Collapse mt={0} isOpen={show}>
          <ControlButtons />
          </Collapse>          
          <Description id={id} description={description} handleBlur={handleBlur} handleEdit={handleEdit} styledEdit={styledEdit} ControlButtons={ControlButtons} />
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
          <LiveProvider
            theme={theme}
            language="javascript"
            code={snippetPlaceHolder.trim()}  
        >
            <LiveEditor
              padding={10}
              style={{
                fontFamily: 'Menlo,monospace',
                flex: 2,
                fontSize: '14px',
                minHeight: '300px',
                borderRadius: '5px',
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
            />
          </LiveProvider>
        </Box>
      </Flex>
      <Flex mt="20px" justify="flex-end" w="100%">
        <IconButton
          variant="ghost"
          variantColor="teal"
          aria-label="Edit Snippet"
          fontSize="22px"
          icon={FaEdit}
        />
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
