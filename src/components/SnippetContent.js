import React, { useState } from "react";
import {
  Collapse,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  useClipboard,
  Stack
} from "@chakra-ui/core";
import { LiveProvider, LiveEditor, withLive } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import { MdContentCopy } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import SnippetMenu from "./SnippetMenu";

const SnippetContent = (
  { content, isFav, id, handleUpdate, handleEdit },
  props
) => {
  const snippetPlaceHolder = `${content}`;
  const [value] = React.useState(snippetPlaceHolder);
  const { onCopy, hasCopied } = useClipboard(value);

  const handleBlur = event => {
    handleToggle(false);
  };
  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  return (
    <>
      <LiveProvider
        theme={theme}
        language="javascript"
        code={snippetPlaceHolder}
        transformCode={e => handleEdit(e, "content")}
        style={{
          outline: "none"
        }}
      >
        <Stack isReversed>
          <LiveEditor
            padding={10}
            onBlur={handleBlur}
            onClick={() => {
              handleToggle(true);
            }}
            style={{
              fontFamily: "Menlo,monospace",
              flex: 2,
              fontSize: "14px",
              minHeight: "300px",
              borderBottomRightRadius: "5px",
              borderBottomLeftRadius: "5px"
            }}
            _focus={{
              outline: "none"
            }}
          />
          <Box
            h="45px"
            opacity="0.96"
            d="flex"
            p={2}
            justifyContent="space-between"
            backgroundColor="#051525"
            style={{
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px"
            }}
          >
            {isFav ? (
              <Box
                ml="10px"
                borderRadius="5px"
                p="3px"
                backgroundColor="#FEB2B2"
                as={FaStar}
                size="25px"
                color="#FFFFFF"
                style={{
                  animation: "rotation 1.5s linear"
                }}
              />
            ) : (
              <Box />
            )}

            <Stack isInline spacing={1}>
              {hasCopied ? (
                <Button
                  variant="unstyled"
                  variantColor="teal"
                  size="xs"
                  disabled={true}
                  style={{
                    color: "#ffffff"
                  }}
                >
                  Copied
                </Button>
              ) : (
                <IconButton
                  p="3px"
                  mt="2px"
                  variant="ghost"
                  size="xs"
                  variantColor="teal"
                  aria-label="Call Sage"
                  fontSize="18px"
                  onClick={onCopy}
                  icon={MdContentCopy}
                />
              )}
              <SnippetMenu {...{ isFav, id }} />
            </Stack>
          </Box>
        </Stack>
      </LiveProvider>
      <Collapse mt="15px" isOpen={show}>
        <ButtonGroup mb="10px" justifyContent="center" size="sm">
          <Button
            variantColor="teal"
            onMouseDown={e => handleUpdate("content")}
          >
            Save
          </Button>
          <IconButton icon="close" />
        </ButtonGroup>
      </Collapse>
    </>
  );
};

export default withLive(SnippetContent);
