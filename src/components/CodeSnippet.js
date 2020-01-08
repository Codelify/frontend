import React, { useContext } from 'react';
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
} from '@chakra-ui/core';
import { LiveProvider, LiveEditor } from 'react-live';
import theme from 'prism-react-renderer/themes/nightOwl';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_SNIPPET } from '../graphql/mutation';

const CodeSnippet = ({ title, id, description, url, tags, content }) => {
  const snippetPlaceHolder = `${content}`;
  const { dispatch } = useContext(AppContext);
  const [deleteSnippet] = useMutation(DELETE_SNIPPET);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Flex flexWrap="wrap" mt="30px">
        <Stack
          mr="15px"
          minWidth="310px"
          w={['100%', '100%', '100%', '35%']}
          spacing="14px"
        >
          <Heading mb={4} as="h3" size="lg">
            {title}
          </Heading>
          <Text fontSize="sm"> {description}</Text>
          <Link color="teal.500" href={url} isExternal>
            Link <Icon name="external-link" mx="2px" />
          </Link>
          <Stack justify="flex-start" isInline>
            {tags &&
              tags.map(tag => {
                return (
                  <>
                    <Badge mr="4px" variantColor="green">{tag}</Badge>
                  </>
                );
              })}
            {/* <Badge>JSX</Badge>
            <Badge variantColor="red">Map</Badge>
            <Badge variantColor="purple">Object Keys</Badge> */}
          </Stack>
        </Stack>
        <Box minWidth="310px" w={['100%', '100%', '100%', '60%']}>
          <LiveProvider
            theme={theme}
            language="javascript"
            code={snippetPlaceHolder.trim()}
            disabled
          >
            <LiveEditor
              padding={10}
              style={{
                fontFamily: 'Menlo,monospace',
                flex: 2,
                fontSize: '14px',
                minHeight: '300px',
                borderRadius: '5px',
              }}
            />
          </LiveProvider>
        </Box>
      </Flex>
      <Flex justify="flex-end" w="100%">
        <IconButton
          variant="ghost"
          variantColor="teal"
          aria-label="Delete Snippet"
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
        />
      </Flex>
      <Divider />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Archive Snippet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure?</ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CodeSnippet;
