import React, { useState, useContext } from "react";
import {
  Collapse,
  Badge,
  Box,
  Button,
  Text,
  Stack,
  useClipboard,
  Link,
  useDisclosure
} from "@chakra-ui/core";
import SnippetContext from "../context/SnippetContext";
import TwitterSnippetImage from "./TwitterSnippetImage"
// import TwiiterShareView from '../'
import { FaLink, FaEyeSlash, FaTwitter, FaGlobe } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";
import config from "../utils/config";
import domtoimage from "dom-to-image";
import axios from "axios";

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
      <Text>Public</Text>
    </Stack>
  );
};

const ShareOptions = ({ isPublic, shareId, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const snippetPublicLink = `${config.host.uri}/view/snippet/${shareId}`;
  const { onCopy, hasCopied } = useClipboard(snippetPublicLink);
  const [visible, setVisible] = useState(isPublic);
  const [loading, setLoading] = useState(false);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const refBox = React.useRef(null);

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

  function openTwitterUrl(twitterUrl) {
    const width = 575;
    const height = 400;
    const left = (window.outerWidth - width) / 2;
    const top = (window.outerHeight - height) / 2;
    const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    window.open(twitterUrl, "twitter", opts);
  }

  const handleShare = () => {
    onOpen();
    // setLoading(true);
    // let node = document.getElementById(`post-img-${id}`);
    // domtoimage
    //   .toPng(node)
    //   .then(dataUrl => {
    //     axios
    //       .post(
    //         `${config.backend.uri}/imagetotweet`,
    //         {
    //           dataUrl: dataUrl,
    //           shareId
    //         },
    //       )
    //       .then(res => {
    //         const url = snippetPublicLink;
    //         const via = "codelify_dev";
    //         const title = res.data.message;
    //         const hashtags = "codelify,snippet";
    //         const twiiterURL = `https://twitter.com/share?url=${url}&text=${title}&via=${via}&hashtags=${hashtags}`;
    //         openTwitterUrl(twiiterURL);
    //       })
    //       .finally(() => setLoading(false))
    //       .catch(err => console.log(err, "Error trying to tweet"));
    //   })
    //   .catch(err => console.log(err));
  };
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
            {hasCopied ? "Copied" : "Copy link"}
          </Button>
        </Stack>
        <Stack
          py="10px"
          alignItems="center"
          justifyContent="flex-start"
          isInline
        >
          <Box mx="5px" as={FaTwitter} />
          <Button _focus={{ outline: "none" }} variant="unstyled" fontWeight="normal" onClick={handleShare} fontSize="sm" isLoading={loading}>
            Share on Twitter
          </Button>
          {/* </a> */}
          />
        </Stack>
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
    <TwitterSnippetImage 
      shareId={shareId}
      isOpen={isOpen}
      onClose={onClose}
      size="full"
    />
    </>
  );
};

export default ShareOptions;
