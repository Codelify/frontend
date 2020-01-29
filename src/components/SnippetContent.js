import React, { useState } from "react";
import { Collapse, ButtonGroup, Button, IconButton } from "@chakra-ui/core";
import { LiveProvider, LiveEditor, withLive } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";

const SnippetContent = ({ content, id, handleUpdate, handleEdit }, props) => {
  const handleBlur = event => {
    handleToggle(false);
  };
  const [show, setShow] = useState(false);

  const handleToggle = newShow => {
    setShow(newShow);
  };
  const snippetPlaceHolder = `${content}`;
  return (
    <>
      <LiveProvider
        theme={theme}
        language="javascript"
        code={snippetPlaceHolder}
        transformCode={e => handleEdit(e, "content")}
        style={{
          outline: "none",
          borderRadius: "5px"
        }}
      >
        <LiveEditor
          padding={10}
          onBlur={handleBlur}
          onClick={() => {
            handleToggle(true);
          }}
          style={{
            fontFamily: "Menlo,monospace",
            flex: 2,
            fontSize: "14px",
            minHeight: "300px",
            borderRadius: "5px"
          }}
          _focus={{
            outline: "none"
          }}
        />
      </LiveProvider>
      <Collapse mt="15px" isOpen={show}>
        <ButtonGroup mb="10px" justifyContent="center" size="sm">
          <Button
            variantColor="teal"
            onMouseDown={e => handleUpdate("content")}
          >
            Save
          </Button>
          <IconButton icon="close" />
        </ButtonGroup>
      </Collapse>
    </>
  );
};

export default withLive(SnippetContent);
