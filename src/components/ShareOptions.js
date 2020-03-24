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
} from "@chakra-ui/core";
import SnippetContext from "../context/SnippetContext";
import { FaLink, FaEyeSlash, FaTwitter, FaGlobe } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";
import config from "../utils/config";
import { navigate } from "@reach/router";
import domtoimage from "dom-to-image";

import base64Img from "base64-img";
import Twitter from "twitter";
import testImg from "../assets/img/app-shot-light.png";

// import fs from "fs-es6";

const client = new Twitter({
  consumer_key: "Irk7MrNmvDqwkuxo0uB7UgUUl",
  consumer_secret: "PQQIdSWivJNkixaaViddGp4JerdAWEbU1UgqZmXEVL14fxTin7",
  access_token_key: "1219735467756834818-5eQzXOqgwYSz4v2V7x80TV7pD0hA9J",
  access_token_secret: "igTqzGEasZX2h2AaP0KkBYOBqYc7MY4qJRx70T36lhPaE",
});

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
  const snippetPublicLink = `${config.host.uri}/view/snippet/${shareId}`;
  const { onCopy, hasCopied } = useClipboard(snippetPublicLink);
  const [visible, setVisible] = useState(isPublic);
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
          token: token,
        },
        refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }],
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
    client.post(
      "media/upload",
      {
        media:
          "https://res.cloudinary.com/dhsegkn40/image/upload/v1580472068/d1_gqlxzm.jpg",
      },
      function(error, media, response) {
        if (error) {
          console.log(error);
        } else {
          const status = {
            status: "I tweeted from React.js!",
            media_ids: media.media_id_string,
          };
          console.log(status);

          client.post("statuses/update", status, function(
            error,
            tweet,
            response,
          ) {
            if (error) {
              console.log(error);
            } else {
              console.log("Successfully tweeted an image!");
            }
          });
        }
      },
    );

    // setTimeout(() => {
    // }, 2000);
    // const NodeImg = refBox.current;
    // console.log(NodeImg);
    // domtoimage
    //   .toPng(NodeImg)
    //   .then(dataUrl => {
    //     // const Img = new Image();
    //     // Img.src = dataUrl;
    //     console.log("data URL:", dataUrl);
    //     const imgLink =
    //       "https://res.cloudinary.com/dhsegkn40/image/upload/v1580393154/image_from_ios_kocwtf.jpg";
    //     const content = encodeURIComponent(
    //       `Created with @codelify_dev ${imgLink}`,
    //     );
    //     const url = "http://35483158.ngrok.io";
    //     const via = "codelify_dev";
    //     const title = "Ttitle Example";
    //     const hashtags = "codelify,snippet";
    //     const twiiterURL = `https://twitter.com/share?url=${url}&text=${title}&via=${via}&hashtags=${hashtags}`;
    //     openTwitterUrl(twiiterURL);
    //   })
    //   .catch(err => console.log(err));
  };

  const url = "http://fc3b76c7.ngrok.io/";
  const via = "codelify_dev";
  const title = "Ttitle Example";
  const hashtags = "codelify,snippet";
  return (
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
          {/* <a
            href={`https://twitter.com/share?url=${url}&text=${title}&via=${via}&hashtags=${hashtags}`}
            target="_blank"
            rel="noopener noreferrer"
          > */}
          <Text onClick={handleShare} fontSize="sm">
            Publish on Twitter
          </Text>
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
  );
};

export default ShareOptions;
