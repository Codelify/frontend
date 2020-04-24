import React, { useState, useEffect, useCallback, useContext } from "react";
import { UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";
import { useMutation } from "@apollo/react-hooks";

import {
  Alert,
  AlertIcon,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/core";
import SnippetContext from "../context/SnippetContext";
import { MdAdd } from "react-icons/md";

const SnippetTags = ({ id, tags }) => {
  const editMode = useContext(SnippetContext);
  // When a snippet was synched from GIST. The tags comes as NULL
  // thus breaking the code when attmepting an update. Therefore
  // we add a safegard to default to an empty array
  // Probaly need to handled from the BE (defaulted to an empty array from the data fetched)
  const [tagsList, setTagsList] = useState(tags || []);
  const [addingTagMode, setAddingTagMode] = useState(false);
  const [updateSnippet] = useMutation(UPDATE_SNIPPET);
  const [isError, setIsError] = useState(false);

  const handleEditTag = useCallback(
    async tags => {
      const token = window.localStorage.getItem("token");
      try {
        // eslint-disable-next-line no-empty-pattern
        const {} = await updateSnippet({
          variables: {
            snippetId: id,
            snippetInfo: { tags: tags },
            token: token
          },
          refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
        });
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    },
    [id, updateSnippet]
  );

  useEffect(() => {
    handleEditTag(tagsList);
  }, [tagsList, handleEditTag]);

  const tagsId = `tags_${id}`;
  const handleBlur = event => {
    setAddingTagMode(false);
    setIsError(false);
  };

  const handleToggle = newShow => {
    if (newShow) {
      setAddingTagMode(true);
    }
  };

  useEffect(() => {
    if (addingTagMode) {
      document.getElementById(tagsId).focus();
    }
  }, [addingTagMode, tagsId]);

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
      handleEditTag(tagsList);
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
                <TagLabel fontSize=".8em" textTransform="uppercase" mr="3px">
                  {tag}
                </TagLabel>
                {!editMode && (
                  <TagCloseButton
                    _focus={{
                      outline: "none"
                    }}
                    onClick={() => {
                      handleDeleteTag(index);
                    }}
                  />
                )}
              </Tag>
            );
          })}
        {!editMode && (
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
        )}
      </Stack>
      {isError && (
        <Alert mb="20px" status="error">
          <AlertIcon />
          <Text fontSize="xs">There was an error processing your update</Text>
        </Alert>
      )}
      {addingTagMode && ( 
        <>
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
        </>
      )}
    </>
  );
};

export default SnippetTags;
