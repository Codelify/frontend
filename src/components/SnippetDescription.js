import React, { useState } from "react";
import {
  Text,
  Collapse,
  ButtonGroup,
  Button,
  IconButton
} from "@chakra-ui/core";

import ContentEditable from "react-contenteditable";

const Description = ({
  id,
  description,
  handleEdit,
  styledEdit,
  handleUpdate
}) => {
  const handleBlur = event => {
    document.getElementById(event.target.id).classList.remove("edited-div");
    handleToggle(false);
  };

  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  const descriptionId = `description_${id}`;
  return (
    <>
      <Text as="div" mb="5px" contenteditable="true" fontSize="sm">
        <ContentEditable
          html={description}
          disabled={false}
          id={descriptionId}
          onBlur={handleBlur}
          onChange={e => handleEdit(e, "description")}
          onFocus={styledEdit}
          onClick={() => {
            handleToggle(true);
          }}
          style={{
            outline: "none"
          }}
        />
      </Text>
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
    </>
  );
};

export default Description;
