import React, { useState } from "react";
import { Collapse } from "@chakra-ui/core";
import { LiveProvider, LiveEditor } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";

const SnippetContent = ({ content, id, ControlButtons }) => {
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
        code={snippetPlaceHolder.trim()}
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
            borderRadius: "5px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}
          _focus={{
            outline: "none"
          }}
        />
      </LiveProvider>
      <Collapse mt="15px" isOpen={show}>
        {/* <ControlButtons /> */}
      </Collapse>
    </>
  );
};

export default SnippetContent;
