import React, { useState, useContext } from "react";
import {
  Collapse,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  useClipboard,
  Stack,
} from "@chakra-ui/core";
import SnippetContext from '../context/SnippetContext';
import { LiveProvider, LiveEditor, withLive } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import { MdContentCopy } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import SnippetMenu from "./SnippetMenu";

const SnippetContent = (
  { content, id, isFav, handleEdit, handleUpdate, codeLangage }
) => {
  const disableEdit = useContext(SnippetContext);
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
        disabled={disableEdit}
        theme={theme}
        language={codeLangage === "other" ? "javascript" : codeLangage}
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
            opacity="0.96"
            d="flex"
            pb={1}
            px={2}
            justifyContent="flex-end"
            backgroundColor="#051525"
          >
            {isFav ? (
              <Box
                mx="10px"
                backgroundColor="none"
                as={FaRegStar}
                size="22px"
                color="#4FD1C5"
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
                  variant="ghost"
                  size="xs"
                  variantColor="teal"
                  aria-label="Call Sage"
                  fontSize="18px"
                  onClick={onCopy}
                  icon={MdContentCopy}
                />
              )}
              {
                !disableEdit && <SnippetMenu {...{ isFav, id }} />
              }
            </Stack>
          </Box>
        </Stack>
      </LiveProvider>
      {
        !disableEdit &&
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
      }
    </>
  );
};

export default withLive(SnippetContent);
