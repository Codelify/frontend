import React, { useState, useContext } from "react";
import {
  Collapse,
  Badge,
  Box,
  Button,
  Text,
  Stack,
  useClipboard,
  Link
} from "@chakra-ui/core";
import { Link as ReachLink } from "@reach/router";
import SnippetContext from "../../context/SnippetContext";
// import TwiiterShareView from '../'
import { FaLink, FaEyeSlash, FaTwitter, FaGlobe } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../../graphql/mutation";
import { MY_SNIPPETs } from "../../graphql/query";
import config from "../../utils/config";
import isLoggedIn from "../../utils/auth";

const Private = () => {
  return (
    <Stack p="3px" isInline alignItems="center">
      <Box fontSize="md" as={FaEyeSlash} color="red.400" />
      <Text>Private</Text>
    </Stack>
  );
};

const Public = () => {
  return (
    <Stack p="3px" isInline alignItems="center">
      <Box fontSize="md" as={FaGlobe} color="green.400" />
      <Text>Public Wall</Text>
    </Stack>
  );
};

const ShareOptions = ({ isPublic, shareId, id }) => {
  const snippetPublicLink = `${config.host.uri}/view/snippet/${shareId}`;
  const { onCopy, hasCopied } = useClipboard(snippetPublicLink);
  const [visible, setVisible] = useState(isPublic);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const refBox = React.useRef(null);
  const auth = isLoggedIn();

  const toggleVisibility = async () => {
    setVisible(!visible);
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: { isPublic: !visible },
          token: token
        },
        refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  const editMode = useContext(SnippetContext);

  return (
    <>
    <Box p="10px" ref={refBox}>
      <Button
        mb="20px"
        _focus={{ outline: "none" }}
        rightIcon={show ? MdKeyboardArrowDown : MdKeyboardArrowUp}
        variant="link"
        size="sm"
        onClick={handleToggle}
      >
        Sharing options
      </Button>
      <Collapse isOpen={show}>
        <Stack alignItems="center" justifyContent="flex-start" isInline>
          <Box mx="5px" as={FaLink} />
          <Link
            href={snippetPublicLink}
            style={{ overflow: "hidden" }}
            fontSize="sm"
            _focus={{ outline: "none" }}
          >
            {snippetPublicLink}
          </Link>
          <Button
            onClick={onCopy}
            variantColor="gray"
            size="xs"
            _focus={{ outline: "none" }}
          >
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </Stack>
        {
          auth && (
            <Stack
            py="10px"
            alignItems="center"
            justifyContent="flex-start"
            isInline
          >
            <Box mx="5px" as={FaTwitter} />
            <Link as={ReachLink} to={`/view/twit/${shareId}`} fontSize="sm">
              Share on Twitter
            </Link>
          </Stack>  
          )
        }
        {!editMode && (
          <Stack
            py="10px"
            alignItems="center"
            justifyContent="flex-start"
            isInline
          >
            <Badge
              style={{ cursor: "pointer" }}
              onClick={toggleVisibility}
              variantColor={visible ? "green" : "red"}
            >
              {visible ? <Public /> : <Private />}
            </Badge>
          </Stack>
        )}
      </Collapse>
    </Box>
    </>
  );
};

export default ShareOptions;
