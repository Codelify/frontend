import React, { useState, useContext } from "react";
import {
  Text,
  Collapse,
  ButtonGroup,
  Button,
  IconButton
} from "@chakra-ui/core";
import SnippetContext from '../context/SnippetContext'
import ContentEditable from "react-contenteditable";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";

const Description = ({
  id,
  description,
  styledEdit
}) => {
  const[snippetDescription, setSnippetDescription] = useState(description || "")
  const disableEdit = useContext(SnippetContext);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const handleBlur = event => {
    document.getElementById(event.target.id).classList.remove("edited-div");
    handleToggle(false);
  };

  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  const handleEdit = (event) => {
    let dataWithUpdate = event.target && event.target.value;
    setSnippetDescription(dataWithUpdate)
  }

  const handleUpdate = async () =>{
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: {"description" : snippetDescription},
          token: token
        }
        //refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
      });
    } catch (error) {
      console.log("Update error: " + error);
    }
  }
  const descriptionId = `description_${id}`;
  return (
    <>
      <Text as="div" mb="5px" contenteditable="true" fontSize="md">
        <ContentEditable
          html={snippetDescription}
          disabled={disableEdit}
          id={descriptionId}
          onBlur={handleBlur}
          onChange={e => handleEdit(e)}
          onFocus={styledEdit}
          onClick={() => {
            handleToggle(true);
          }}
          style={{
            outline: "none"
          }}
        />
      </Text>
      {
        !disableEdit &&
        <Collapse mt={0} isOpen={show}>
          <ButtonGroup mb="10px" justifyContent="center" size="sm">
            <Button
              variantColor="teal"
              onMouseDown={() => handleUpdate("description")}
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

export default Description;
