import React, { useState, useContext } from "react";
import {
  Alert,
  AlertIcon,
  Text,
  Collapse,
  ButtonGroup,
  Button,
  IconButton
} from "@chakra-ui/core";
import SnippetContext from "../context/SnippetContext";
import ContentEditable from "react-contenteditable";
import ReactMarkdown from "react-markdown";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";

const Description = ({ id, description, styledEdit }) => {
  const [snippetDescription, setSnippetDescription] = useState(
    description || "No description"
  );
  const disableEdit = useContext(SnippetContext);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState(false);

  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  const handleEdit = event => {
    let dataWithUpdate = event.target && event.target.value;
    setSnippetDescription(dataWithUpdate);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: { description: snippetDescription },
          token: token
        }
      });
      handleClose();
    } catch (error) {
      console.log("Update error: " + error);
      setIsError(true);
    }
    setIsUpdating(false);
  };

  const handleClose = () => {
    document.getElementById(descriptionId).classList.remove("edited-div");
    handleToggle(false);
    if (isError) {
      setIsError(false);
    }
  };

  const descriptionId = `description_${id}`;
  return (
    <>
    
      <Text as="div" mb="5px" contenteditable="true" fontSize="md">
        {/* <ReactMarkdown> */}
        <ContentEditable
          html={snippetDescription}
          disabled={disableEdit}
          id={descriptionId}
          onChange={e => handleEdit(e)}
          onFocus={styledEdit}
          onClick={() => {
            handleToggle(true);
          }}
          style={{
            outline: "none"
          }}
          />
          {/* </ReactMarkdown> */}
      </Text>


      {!disableEdit && (
        <Collapse mt={0} isOpen={show}>
          <ButtonGroup mb="10px" justifyContent="center" size="sm">
            <Button
              isLoading={isUpdating}
              variantColor="teal"
              onMouseDown={() => handleUpdate("description")}
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

export default Description;