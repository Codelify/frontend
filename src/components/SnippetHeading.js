import React, { useState, useContext } from "react";
import {
  Alert,
  AlertIcon,
  Heading,
  Collapse,
  ButtonGroup,
  Button,
  IconButton,
  Text
} from "@chakra-ui/core";
import SnippetContext from "../context/SnippetContext";
import ContentEditable from "react-contenteditable";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";

const SnippetHeading = ({ id, title, styledEdit }) => {
  const disableEdit = useContext(SnippetContext);
  const [snippetTitle, setSnippetTitle] = useState(title || "No title");
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleEdit = event => {
    let dataWithUpdate = event.target && event.target.value;
    setSnippetTitle(dataWithUpdate);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: { title: snippetTitle },
          token: token
        }
        //refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
      });
      handleClose();
    } catch (error) {
      console.log("Update error: " + error);
      setIsError(true);
    }
    setIsUpdating(false);
  };

  const handleClose = () => {
    document.getElementById(titleId).classList.remove("edited-div");
    handleToggle(false);
    if (isError) {
      setIsError(false);
    }
  };

  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  const titleId = `title_${id}`;

  return (
    <>
      <Heading mb="5px" as="h3" size="lg">
        <ContentEditable
          onChange={e => handleEdit(e, "title")}
          html={snippetTitle}
          disabled={disableEdit}
          id={titleId}
          onClick={() => {
            handleToggle(true);
          }}
          onFocus={styledEdit}
          style={{
            outline: "none"
          }}
        />
      </Heading>
      {!disableEdit && (
        <Collapse mt={0} isOpen={show}>
          <ButtonGroup mb="10px" justifyContent="center" size="sm">
            <Button
              isLoading={isUpdating}
              variantColor="teal"
              onMouseDown={() => handleUpdate()}
            >
              Save
            </Button>
            <IconButton onClick={handleClose} icon="close" />
          </ButtonGroup>
          {isError && (
            <Alert mb="20px" status="error">
              <AlertIcon />
              <Text fontSize="xs">
                There was an error processing your update
              </Text>
            </Alert>
          )}
        </Collapse>
      )}
    </>
  );
};

export default SnippetHeading;
