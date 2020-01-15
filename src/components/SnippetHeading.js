import React, { useState } from "react";
import {
  Heading,
  Collapse,
  ButtonGroup,
  Button,
  IconButton
} from "@chakra-ui/core";

import ContentEditable from "react-contenteditable";

const SnippetHeading = ({
  id,
  title,
  styledEdit,
  useMutation,
  UPDATE_SNIPPET,
  handleUpdate,
  handleEdit
}) => {
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const [updateTitle, setUpdateTitle] = useState("");

  const handleBlur = event => {
    document.getElementById(event.target.id).classList.remove("edited-div");
    handleToggle(false);
  };

  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  const titleId = `title_${id}`;

  //   const handleUpdate = async () => {
  //     console.log("Update function");
  //     const token = window.localStorage.getItem("token");
  //     const { data, loading } = await updateSnippet({
  //       variables: {
  //         snippetId: id,
  //         snippetInfo: {
  //           title: updateTitle
  //         },
  //         token: token
  //       }
  //     });
  //     console.log(data, loading);
  //   };

  return (
    <>
      <Heading mb="5px" as="h3" size="lg">
        <ContentEditable
          html={title}
          disabled={false}
          id={titleId}
          onBlur={handleBlur}
          onClick={() => {
            handleToggle(true);
          }}
          onChange={handleEdit}
          onFocus={styledEdit}
          style={{
            outline: "none"
          }}
        />
      </Heading>
      <Collapse mt={0} isOpen={show}>
        <ButtonGroup mb="10px" justifyContent="center" size="sm">
          <Button variantColor="teal" onClick={() => handleUpdate("title")}>
            Save
          </Button>
          <IconButton icon="close" />
        </ButtonGroup>
      </Collapse>
    </>
  );
};

export default SnippetHeading;
