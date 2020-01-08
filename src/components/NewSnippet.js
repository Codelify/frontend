import React, { useState, useContext } from "react";
import { AppContext } from "../utils/AppProvider";
import {
  Box,
  Flex,
  Input,
  Button,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Textarea
} from "@chakra-ui/core";
import { LiveProvider, LiveEditor } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import { navigate } from "@reach/router";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { CREATE_SNIPPET } from "../graphql/mutation";

const NewSnippet = props => {
  const { isOpen, onClose, firstField, btnRef, size } = props;
  const { dispatch } = useContext(AppContext);

  const initialFormValues = {
    sourceUrl: "",
    description: "",
    title: ""
  };

  const [createSnippet] = useMutation(CREATE_SNIPPET);
  const handleSubmit = async () => {
    const snippetData = { ...formData, content: code };
    const token =
      (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
      "";
    const variables = { input: { ...snippetData }, token };
    if (!token) {
      typeof window !== "undefined" &&
        window.localStorage.setItem("snippetData", JSON.stringify(variables));
      onClose(false);
      navigate("/app/login");
    }
    const { data, error } = await createSnippet({ variables });
    if (data) {
      dispatch({
        type: "ADD_SNIPPET",
        payload: { ...data.createSnippet, title: formData.title }
      });
      onClose(false);
      toast("Snippet successfully save 🍹");
      navigate("/app");
    }
    if (error) {
      toast.error("Oops, an error occurred trying to save snippet 😔");
    }
  };

  const snippetPlaceHolder = `
/* Edit or copy and paste your code snippet here */

const a = 10;
    `;

  const [code, setCode] = useState(snippetPlaceHolder);

  const [formData, setFormData] = useState(initialFormValues);

  const handleSnippetChange = code => {
    setCode(code);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      finalFocusRef={btnRef}
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          textAlign="center"
          fontSize="xl"
          borderBottomWidth="1px"
          color="#319795"
          mb="30px"
        >
          Create a new Snippet
        </DrawerHeader>

        <DrawerBody>
          <Flex flexWrap="wrap" w="100%">
            <Stack
              borderWidth="1px"
              padding="10px"
              rounded="10px"
              minWidth="330px"
              w="35%"
              mt="20px"
              mr="20px"
              spacing="24px"
            >
              <Box>
                <FormLabel htmlFor="username">Title</FormLabel>
                <Input
                  ref={firstField}
                  id="title"
                  placeholder="Snippet title"
                  focusBorderColor="#319795"
                  name="title"
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Url</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type="url"
                    id="url"
                    placeholder="Link to this snippet context/page"
                    rounded="0"
                    borderWidth="1px"
                    focusBorderColor="#319795"
                    name="sourceUrl"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  focusBorderColor="#319795"
                  name="description"
                  onChange={handleChange}
                />
              </Box>
            </Stack>

            <Box mt="20px" minWidth="330px" w="60%">
              <LiveProvider
                theme={theme}
                language="javascript"
                code={code.trim()}
              >
                <FormLabel htmlFor="desc">Code</FormLabel>
                <LiveEditor
                  padding={10}
                  onChange={code => handleSnippetChange(code)}
                  style={{
                    fontFamily: "Menlo,monospace",
                    borderRadius: "5px",
                    flex: 2,
                    fontSize: "14px",
                    minHeight: "300px"
                  }}
                />
              </LiveProvider>
            </Box>
          </Flex>
          <Flex mt="20px" justify="flex-end">
            <Button variant="outline" mr={13} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variantColor="teal" mr={35}>
              Submit
            </Button>
          </Flex>
          <Box mt="150px"></Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NewSnippet;
