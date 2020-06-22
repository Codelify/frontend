import React, { useState, useContext } from "react";
import {
  Alert,
  AlertIcon,
  Collapse,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  useClipboard,
  Stack,
  Text
} from "@chakra-ui/core";
import SnippetContext from "../../context/SnippetContext";
import { LiveProvider, LiveEditor, withLive } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import { MdContentCopy } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import SnippetMenu from "./SnippetMenu";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../../graphql/mutation";

const SnippetContent = ({
  content,
  id,
  isFav,
  handleEdit = () => {
    return;
  },
  codeLangage
}) => {
  const disableEdit = useContext(SnippetContext);
  const snippetPlaceHolder = `${content}`;
  const [value] = React.useState(snippetPlaceHolder);
  const { onCopy, hasCopied } = useClipboard(value);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [show, setShow] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: { content: snippetPlaceHolder },
          token: token
        }
        //refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
      });
      setShow(false);
    } catch (error) {
      console.log("Update error: " + error);
      setIsError(true)
    }
    setIsUpdating(false);
  };

  return (
    <>
      <LiveProvider
        disabled={disableEdit}
        theme={theme}
        language={
          codeLangage === "other" || codeLangage === null
            ? "javascript"
            : codeLangage
        }
        code={snippetPlaceHolder}
        transformCode={e => handleEdit(e, "content")}
      >
        <Stack isReversed>
          <LiveEditor
            onClick={() => {
              setShow(true);
            }}
            style={{
              fontFamily: "Menlo,monospace",
              flex: 2,
              fontSize: "14px",
              minHeight: "300px",
              borderBottomRightRadius: "5px",
              borderBottomLeftRadius: "5px",
              boxShadow: "10px 10px 25px -1px rgba(0,0,0,0.75)"
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
              {!disableEdit && <SnippetMenu {...{ isFav, id }} />}
            </Stack>
          </Box>
        </Stack>
      </LiveProvider>
      {!disableEdit && (
        <>
            <Collapse mt="15px" isOpen={show}>
            <Stack w="100%" isInline>
              <ButtonGroup mb="10px" justifyContent="center" size="sm">
                <Button
                  isLoading={isUpdating}
                  variantColor="teal"
                  onMouseDown={e => handleUpdate("content")}
                >
                  Save
                </Button>
                <IconButton 
                  onClick={()=>{
                    setIsError(false);
                    setShow(false);
                  }}  
                  icon="close"
                />
              </ButtonGroup>
              {
                isError &&
                <Alert p="6px" mb="20px" status="error">
                <AlertIcon />
                <Text fontSize="xs">
                  There was an error processing your update
                </Text>
              </Alert>
              }
              </Stack>
            </Collapse>
        </>
      )}
    </>
  );
};

export default withLive(SnippetContent);
