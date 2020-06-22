import React, { useState, useEffect } from "react";
//import { AppContext } from "../utils/AppProvider";
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
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Textarea,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
  Heading,
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/core";
import { LiveProvider, LiveEditor } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import { navigate } from "@reach/router";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";
import { handleRouteChange } from "../utils/handleRouteChange";
import CodeLangageBar from './Snippet/CodeLangageBar'

const NewSnippet = props => {
  const { isOpen, onClose, firstField, btnRef, size } = props;
  const [errorTitle, setErrorTitle] = useState(null);
  // const { dispatch } = useContext(AppContext);

  const initialFormValues = {
    sourceUrl: "",
    description: "",
    title: "",
    lang: null
  };
  const toastin = useToast();

  //Not sure why updateCache function is not working - from doc this is the fastest way to update the cache
  // const updateCache = (cache, { data: { createSnippet } }) => {
  //   console.log(createSnippet);
  //   const { getAuthUserSnippets } = cache.readQuery({
  //     query: MY_SNIPPETs,
  //     variables: { token: localStorage.getItem("token") }
  //   });
  //   cache.writeQuery({
  //     query: MY_SNIPPETs,
  //     variables: { token: localStorage.getItem("token") },
  //     data: {
  //       //getAuthUserSnippets: getAuthUserSnippets.concat(createSnippet)
  //       getAuthUserSnippets: [...getAuthUserSnippets, createSnippet]
  //     }
  //   });
  // };

  const [createSnippet] = useMutation(CREATE_SNIPPET);
  const handleSubmit = async () => {
    setIsLoading(true);
    if (validateTitle() === false) {
      setIsLoading(false);
      return;
    }

    const snippetData = { ...formData, content: code };
    const token =
      (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
      "";
    const variables = { input: { ...snippetData }, token };
    if (!token) {
      localStorage.setItem("snippetData", JSON.stringify(variables));
      onClose(false);
      navigate("/login");
      setIsLoading(false);
    } else {
      const { data, error } = await createSnippet({
        variables,
        //fetchPolicy: "no-cache",
        refetchQueries: [{ query: MY_SNIPPETs, variables: variables }]
      });
      if (data) {
        //console.log(data);
        // dispatch({
        //   type: "ADD_SNIPPET",
        //   payload: {
        //     ...data.createSnippet,
        //     title: formData.title,
        //     tags: formData.tags
        //   }
        // });
        onClose(false);
        setIsLoading(false);
        toastin({
          position: "top-right",
          title: "Yooohooo ! 🍹",
          description: "Your snippet has been saved",
          status: "success",
          duration: 9000,
          isClosable: true
        });
        clearForm();
        // redirect to /app
        data.loading && navigate(handleRouteChange());
      }
      if (error) {
        setIsLoading(false);
        toastin({
          position: "top-right",
          title: "An error occurred.",
          description: "Unable to create this snippet.",
          status: "error",
          duration: 9000,
          isClosable: true
        });
      }
    }
  };

  const snippetPlaceHolder = `
/* Edit or paste your code snippet here */
const formatCurrency = new Intl.NumberFormat("en-US",{
  style:"currency",
  currency:"USD"
  })
    `;

  const [code, setCode] = useState(snippetPlaceHolder);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initialFormValues);

  const handleSnippetChange = code => {
    setCode(code);
  };

  const handleDeleteTag = index => {
    let newTags = tags;
    newTags.splice(index, 1);
    setTags(() => [...newTags]);
  };

  const styledEdit = event => {
    document
      .getElementById(event.target.parentElement.id)
      .classList.add("edited-div");
  };

  const handleBlur = event => {
    document
      .getElementById(event.target.parentElement.id)
      .classList.remove("edited-div");
  };

  // specfifid function to managed entered tags
  const handleAddTags = event => {
    let newTag = false;
    let tag = event.target.value;
    if (tag.charAt(tag.length - 1) === ",") {
      // remove the comma
      tag = tag.substring(0, tag.length - 1);
      newTag = true;
    }
    if (
      ((event.key === "Enter" || event.key === "Tab") &&
        event.target.value !== "") ||
      newTag
    ) {
      // add it to the state holding the list of tags
      setTags(prevState => [...prevState, tag]);
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
      setTags(prevState => [...prevState, tag]);
      // clear the value held in the input field
      event.target.value = "";
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === "title" && errorTitle) {
      // if an error is beeing displayed for title
      // we clear it
      setErrorTitle(null);
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateTitle = () => {
    if (formData.title === "") {
      setErrorTitle("Please give a title to your snippet");
      setIsLoading(false);
      return false;
    } else {
      setErrorTitle(null);
      return true;
    }
  };

  const [ codeLangage, setCodeLangage ] = useState(null)

  const langageSelection = (event) => {
    const langage = event.target.parentElement.id;
    setCodeLangage(langage);
    formData.lang = langage;
  }


  // this useffect each time a tags is added or removed
  // so that the main form data is sycnhed with the tags array
  useEffect(() => {
    // update the main form overall state
    setFormData(prevState => ({
      ...prevState,
      tags: tags
    }));
  }, [tags]);

  const clearForm = () => {
        // clear the tags array
        setTags([]);
        // clear form
        setFormData(initialFormValues);
        setCodeLangage(null)
  }

  const handleCancel = () => {
    clearForm();
    onClose();
  }

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
        <DrawerHeader
          textAlign="center"
          fontSize="xl"
          borderBottomWidth="1px"
          color="#319795"
          mb="30px"
        >
          <Heading>Create a new Snippet</Heading>
        </DrawerHeader>
        <DrawerBody>
          <Flex mb="20px" flexWrap="wrap" w="100%">
            <Stack
              padding="10px"
              rounded="10px"
              minWidth="330px"
              w="35%"
              mt="20px"
              mr="20px"
              spacing="24px"
            >
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="username">Title</FormLabel>
                  <Input
                    ref={firstField}
                    id="title"
                    placeholder="Snippet title"
                    focusBorderColor="#319795"
                    name="title"
                    onChange={handleChange}
                    // onBlur={validateTitle}
                  />
                  {errorTitle && (
                    <Alert mt="3px" status="error">
                      <AlertIcon />
                      Please give a title
                    </Alert>
                  )}
                </FormControl>
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
                <FormLabel htmlFor="tags-box">Tags</FormLabel>
                <Flex
                  flexWrap="wrap"
                  borderRadius="5px"
                  borderWidth="1px"
                  id="tags-box"
                  onFocus={styledEdit}
                  onBlur={handleBlur}
                >
                  <Stack
                    mb="10px"
                    flexWrap="wrap"
                    justify="flex-start"
                    isInline
                  >
                    {tags &&
                      tags.map((tag, index) => {
                        return (
                          <Tag
                            id={index}
                            key={index}
                            variant="subtle"
                            variantColor="teal"
                            my="3px"
                            mx="3px"
                            px="3px"
                            size="sm"
                            _focus={{
                              outline: "none"
                            }}
                          >
                            <TagLabel textTransform="uppercase" paddingX="10px">{tag}</TagLabel>
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
                  </Stack>
                  <Input
                    id="tags"
                    placeholder="Add tags (Press Enter or Comma for multiple tags)"
                    focusBorderColor="none"
                    borderWidth="0px"
                    background="none"
                    name="tags"
                    onKeyDown={handleTab}
                    onKeyUp={handleAddTags}
                  />
                </Flex>
              </Box>{" "}
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
                language={codeLangage === "other" ? "javascript" : codeLangage}
                code={code.trim()}
              >
                <FormLabel htmlFor="desc">Code</FormLabel>
                <Box py="5px" style={{whiteSpace:"nowrap", overflow:"auto"}}>
                  <CodeLangageBar {...{langageSelection, codeLangage}} />
                </Box>

                <LiveEditor
                  padding={10}
                  onChange={code => handleSnippetChange(code)}
                  h="100%"
                  style={{
                    fontFamily: "Menlo,monospace",
                    borderRadius: "5px",
                    flex: 2,
                    fontSize: "14px",
                    minHeight: "300px",
                    height: "90%"
                  }}
                />
              </LiveProvider>
            </Box>
          </Flex>
          <Flex mt="40px" justify="flex-end">
            <Button variant="outline" mr={13} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              // onClick={handleSubmit}
              variantColor="teal"
              mr={35}
              isLoading={isLoading}
              loadingText="Submitting"
              onClick={handleSubmit}
              _focus={{
                outline: "none"
              }}
            >
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
