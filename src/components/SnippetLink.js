import React, { useState } from "react";
import {
  Collapse,
  Box,
  Link,
  Icon,
  ButtonGroup,
  Button,
  IconButton
} from "@chakra-ui/core";
import ContentEditable from "react-contenteditable";

const SnippetLink = ({ id, url, handleUpdate, handleEdit, styledEdit }) => {
  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  const handleBlur = event => {
    event.persist();
    document.getElementById(event.target.id).classList.remove("edited-div");
    handleToggle(false);
  };
  return (
    <Box>
      <ContentEditable
        onChange={e => handleEdit(e, "link")}
        html={url}
        disabled={false}
        id={id}
        onBlur={e => handleBlur(e)}
        onClick={() => {
          handleToggle(true);
        }}
        onFocus={styledEdit}
        style={{
          outline: "none"
        }}
      />
      {/* {url ? (
        <Link color="teal.500" href={url} isExternal>
          Link <Icon name="link" mx="2px" />
        </Link>
      ) : (
        
       <Icon name="edit" mx="2px" onClick={handleToggle(true)} />
      )} */}
      <Collapse mt={0} isOpen={show}>
        <ButtonGroup mb="10px" justifyContent="center" size="sm">
          <Button variantColor="teal" onMouseDown={() => handleUpdate("link")}>
            Save
          </Button>
          <IconButton icon="close" />
        </ButtonGroup>
      </Collapse>
    </Box>
  );
};

export default SnippetLink;
