import React, { useState, useEffect } from "react";
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
  const [tagsList, setTagsList] = useState(tags);

  useEffect(() => {
    handleEdit(tagsList, "tags");
    console.log("@@@@@", tagsList);
  }, [tagsList]);

  const tagsId = `tags_${id}`;
  const handleBlur = event => {
    handleToggle(false);
  };

  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };

  // specfifid function to managed entered tags
  const handleAddTags = event => {
    let newTag = false;
    let tag = event.target.value;
    if (tag.charAt(tag.length - 1) === ",") {
      // remove the comma
      tag = tag.substring(0, tag.length - 1);
      if (tag !== "") {
        newTag = true;
      } else {
        event.target.value = "";
      }
    }
    if (
      ((event.key === "Enter" || event.key === "Tab") &&
        event.target.value !== "") ||
      newTag
    ) {
      // add it to the state holding the list of tags
      setTagsList(prevState => [...prevState, tag]);
      console.log("TAG LISTTT", tagsList);
      handleUpdate(tagsList, "tags");
      // clear the value held in the input field
      event.target.value = "";
    }
  };

  // the Tab must be detected on key down
  // otherwise it cannot be captured in key up
  const handleTab = event => {
    let tag = event.target.value;
    if (event.key === "Tab" && tag !== "") {
      // add it to the state holding the list of tags
      setTagsList(prevState => [...prevState, tag]);
      // clear the value held in the input field
      event.target.value = "";
    }
  };

  const handleDeleteTag = index => {
    let newTags = tagsList;
    newTags.splice(index, 1);
    setTagsList(() => [...newTags]);
    handleUpdate("tags");
  };

  return (
    <>
      <Stack justify="flex-start" flexWrap="wrap" isInline>
        {tagsList &&
          tagsList.map((tag, index) => {
            return (
              <Tag
                key={index}
                minH="30px"
                maxH="30px"
                variant="subtle"
                variantColor="teal"
                size="sm"
                my="2px"
                _focus={{
                  outline: "none"
                }}
              >
                <TagLabel fontSize=".7em" textTransform="uppercase" mr="3px">
                  {tag}
                </TagLabel>
                <TagCloseButton
                  _focus={{
                    outline: "none"
                  }}
                  onClick={() => {
                    handleDeleteTag(index);
                  }}
                />
              </Tag>
            );
          })}
        <IconButton
          my="3px"
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

      <Collapse isOpen={show}>
        <Input
          id={tagsId}
          placeholder="Add tags (Press Enter or Comma for multiple tags)"
          focusBorderColor="#319795"
          name="tags"
          my="5px"
          onBlur={handleBlur}
          onKeyDown={handleTab}
          onKeyUp={handleAddTags}
        />
      </Collapse>
    </>
  );
};

export default SnippetTags;
