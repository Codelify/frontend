import React, { useState } from "react";
import {
    Tag,
    TagLabel,
    TagCloseButton,
    Collapse,
    ButtonGroup,
    Button,
    IconButton,
    Stack
} from "@chakra-ui/core";

import { MdAdd } from "react-icons/md";

const SnippetTags = ({
    id,
    tags,
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
          <Stack justify="flex-start" flexWrap="wrap" isInline>
            {tags &&
              tags.map((tag, index) => {
                return (
                  <Tag
                  id={index}
                  key={index}
                  variant="subtle"
                  variantColor="teal"
                  size="sm"
                  my="3px"
                  _focus={{
                    outline: "none"
                  }}
                  >
                  <TagLabel fontSize=".9em" textTransform="uppercase" mr="3px">{tag}</TagLabel>
                  <TagCloseButton
                    _focus={{
                      outline: "none"
                    }}
                    // onClick={() => {
                    //   handleDeleteTag(index);
                    // }}
                  />
                  </Tag>
                );
              })}
            <IconButton
            my="3px"
            variant="outline"
            variantColor="teal"
            aria-label="Add a Tag"
            size="sm"
            fontSize="1.4em"
            icon={MdAdd}
          />
          </Stack>

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

export default SnippetTags;