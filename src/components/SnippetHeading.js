import React, { useState, useContext } from "react";
import {
  Heading,
  Collapse,
  ButtonGroup,
  Button,
  IconButton
} from "@chakra-ui/core";
import SnippetContext from '../context/SnippetContext';
import ContentEditable from "react-contenteditable";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";

const SnippetHeading = ({
  id,
  title,
  styledEdit
}) => {
  const disableEdit = useContext(SnippetContext);
  const[snippetTitle, setSnippetTitle] = useState(title || "No title");
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  
  const handleEdit = (event) => {
    let dataWithUpdate = event.target && event.target.value;
    setSnippetTitle(dataWithUpdate)
  }

  const handleUpdate = async () =>{
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateSnippet({
        variables: {
          snippetId: id,
          snippetInfo: {"title" : snippetTitle},
          token: token
        }
        //refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
      });
    } catch (error) {
      console.log("Update error: " + error);
    }
  }

  const handleBlur = event => {
    event.persist();
    document.getElementById(event.target.id).classList.remove("edited-div");
    handleToggle(false);
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
          onBlur={e => handleBlur(e)}
          onClick={() => {
            handleToggle(true);
          }}
          onFocus={styledEdit}
          style={{
            outline: "none"
          }}
        />
      </Heading>
      {
        !disableEdit &&
        <Collapse mt={0} isOpen={show}>
        <ButtonGroup mb="10px" justifyContent="center" size="sm">
          <Button variantColor="teal" onMouseDown={() => handleUpdate("title")}>
            Save
          </Button>
          <IconButton icon="close" />
        </ButtonGroup>
        </Collapse>
      }
    </>
  );
};

export default SnippetHeading;
