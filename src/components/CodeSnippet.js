import React, { useState } from "react";
import { Box, Flex, Stack, Link, Icon, Divider } from "@chakra-ui/core";
import SnippetHeading from "./SnippetHeading";
import Description from "./SnippetDescription";
import SnippetTags from "./SnippetTags";
import ShareOptions from "./ShareOptions";
import SnippetContent from "./SnippetContent";
import CodeLangageBar from "./CodeLangageBar";

const CodeSnippet = ({
  title,
  id,
  description,
  url,
  tags,
  content,
  isFav,
  index,
  lang,
  isPublic,
  shareId
}) => {

  const [titleToUpdate, setTitleToUpdate] = useState(title);
  const [descriptionToUpdate, setDescroptionToUpdate] = useState(description || "No description");
  const [contentToUpdate, setContentToUpdate] = useState(content);


  const handleEdit = (event, typeOfAction) => {
    // Case we update the code from Live Provider
    // event from LiveProvider its comming as a string in transformCode prop
    if (typeof event === "string") {
      setContentToUpdate(event);
    }

    //Case we update the code from title/description - onChange function
    // we have to verify if event its not a string or it has a target property
    let dataWithUpdate = event.target && event.target.value;
    switch (typeOfAction) {
      case "title":
        setTitleToUpdate(dataWithUpdate);
        break;
      case "description":
        setDescroptionToUpdate(dataWithUpdate);
        break;
      default:
        return;
    }
  };

  const styledEdit = event => {
    document.getElementById(event.target.id).classList.add("edited-div");
  };

  return (
    <>
      {index !== 0 && <Divider py="10px" mb="30px" />}
      <Flex mb="50px" flexWrap="wrap">
        <Stack
          mr="15px"
          minWidth="310px"
          w={["100%", "100%", "100%", "35%"]}
          spacing="14px"
        >
          <SnippetHeading
            id={id}
            title={titleToUpdate}
            styledEdit={styledEdit}
          />
          <Description
            id={id}
            description={descriptionToUpdate}
            styledEdit={styledEdit}
          />
          <Divider />
          <Box>
            {url && (
              <Link color="teal.500" href={url} isExternal>
                Link to external recources{" "}
                <Icon name="external-link" mx="2px" />
              </Link>
            )}
          </Box>
          <SnippetTags id={id} tags={tags} />
          <Box mt="20px" p="10px" borderTopWidth="1px">
            <ShareOptions {...{ isPublic, shareId, id }} />
          </Box>
        </Stack>
        <Box
          minWidth="310px"
          w={["100%", "100%", "100%", "60%"]}
          borderRadius="5px"
          id={`post-img-${id}`}
        >
          <Box
            py="0px"
            pl="10px"
            style={{
              whiteSpace: "nowrap",
              overflow: "auto",
              opacity: "0.96",
              background:
                "linear-gradient(to bottom, transparent 50%, #051525 50%)"
            }}
          >
            <CodeLangageBar codeLangage={lang} {...{ id }} />
          </Box>
          <SnippetContent
            content={contentToUpdate}
            codeLangage={lang}
            {...{ id, isFav, handleEdit }}
          />
        </Box>
      </Flex>
    </>
  );
};

export default CodeSnippet;