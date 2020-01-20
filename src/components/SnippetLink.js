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

  const handleToggle = newShow => {
    setShow(newShow);
  };

  const handleBlur = event => {
    event.persist();
    document.getElementById(event.target.id).classList.remove("edited-div");
    handleToggle(false);
  };

  const linkId = `link_${id}`;
  //const costumHtml = url && `${url.slice(0, 15)} ...`;

  return (
    <>
      <Flex align="center">
        {url && (
          <Box mr="20px">
            {
              <Link color="teal.500" href={url} isExternal disabled={true}>
                Link <Icon name="link" mx="2px" />
              </Link>
            }
          </Box>
        )}

        <CostumEditable
          onChange={e => handleEdit(e, "sourceUrl")}
          html={url}
          disabled={false}
          id={linkId}
          onBlur={e => handleBlur(e)}
          onClick={() => {
            handleToggle(true);
          }}
          onFocus={styledEdit}
          style={{
            outline: "none"
          }}
        />
      </Flex>
      <Collapse mt={0} isOpen={show}>
        <ButtonGroup mb="10px" justifyContent="center" size="sm">
          <Button
            variantColor="teal"
            onMouseDown={() => handleUpdate("sourceUrl")}
          >
            Save
          </Button>
          <IconButton icon="close" />
        </ButtonGroup>
      </Collapse>
    </>
  );
};

export default SnippetLink;

const CostumEditable = styled(ContentEditable)`
  .test {
    font-style: italic;
  }
`;
