import React, { useState } from "react";
import {
  Collapse,
  Box,
  Link,
  Icon,
  ButtonGroup,
  Button,
  IconButton,
  Flex
} from "@chakra-ui/core";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";

const SnippetLink = ({ id, url, handleUpdate, handleEdit, styledEdit }) => {
  const [show, setShow] = useState(false);
  const [costumHtml] = useState(
    url ? `<p class="test">${url}</p>` : `<p>Add Link</p>`
  );

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
      <Flex align="center">
        <CostumEditable
          onChange={e => handleEdit(e, "link")}
          html={costumHtml}
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

        {/* <Icon name="edit" ml="20px" onClick={() => handleToggle(true)} /> */}
        <Link color="teal.500" href={url} isExternal>
          <Icon name="link" ml="10px" />
        </Link>
      </Flex>
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

const CostumEditable = styled(ContentEditable)`
  .test {
    color: red;
  }
`;
