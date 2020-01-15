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
  handleUpdate,
  handleEdit
}) => {
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
          html={title}
          disabled={false}
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
      <Collapse mt={0} isOpen={show}>
        <ButtonGroup mb="10px" justifyContent="center" size="sm">
          <Button variantColor="teal" onMouseDown={() => handleUpdate("title")}>
            Save
          </Button>
          <IconButton icon="close" />
        </ButtonGroup>
      </Collapse>
    </>
  );
};

export default SnippetHeading;
