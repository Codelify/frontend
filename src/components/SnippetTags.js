import React, { useState } from "react";
import {
    Tag,
    TagLabel,
    TagCloseButton,
    Collapse,
    Input,
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
    //document.getElementById(event.target.id).classList.remove("edited-div");
    handleToggle(false);
    };

    const [show, setShow] = useState(false);

    const handleToggle = newShow => {
        setShow(newShow);
    };

    const tagsId = `tags_${id}`;
    return (
        <>
          <Stack justify="flex-start" flexWrap="wrap" isInline>
            {tags &&
              tags.map((tag, index) => {
                return (
                  <Tag
                  id={tagsId}
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
            variant="ghost"
            variantColor="teal"
            aria-label="Add a Tag"
            size="sm"
            fontSize="1.4em"
            icon={MdAdd}
            _focus={{
              outline: "none"
            }}
            onClick={() => {
              handleToggle(true);
            }}  
          />
          </Stack>

        <Collapse mt={0} isOpen={show}>
        <Input
            id="tags"
            placeholder="Add tags (Press Enter or Comma for multiple tags)"
            focusBorderColor="#319795"
            borderColor="#319795"
            borderWidth="2px"
            name="tags"
            my="5px"          
            // onKeyDown={handleTab}
            // onKeyUp={handleAddTags}
          />
        </Collapse>
        </>
    );
};

export default SnippetTags;