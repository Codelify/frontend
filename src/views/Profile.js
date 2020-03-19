import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  CSSReset,
  Box,
  Heading,
  Text,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorMode,
  InputLeftElement,
  InputGroup,
  Divider,
  Flex,
  IconButton,
  //   InputRightElement,
} from "@chakra-ui/core";
import ContentEditable from "react-contenteditable";
import { navigate } from "@reach/router";
import Container from "../components/Container";
import { IoIosArrowBack } from "react-icons/io";
import useUserData from "../components/~common/useUserData";
import { FaTwitter, FaLinkedin, FaEdit } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PROFILE } from "../graphql/mutation";

// import { MdVpnKey } from "react-icons/md";

function Profile() {
  const [description, setDescription] = useState("");
  const [twitterSocial, setTtwitterSocial] = useState("");
  const [linkedinSocial, setLinkedinSocial] = useState("");
  const [loading, setLoading] = useState(false);
  const { results } = useUserData();
  const { colorMode } = useColorMode();
  //   const [show, setShow] = React.useState(false);
  //   const handleClick = () => setShow(!show);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const avatar = results.avatar;
  const fullName = `${results.lastName} ${results.firstName}`;

  const [profileViewMode, setProfileViewMode] = useState(true);

  const setFocusStyle = event => {
    document.getElementById(event.target.id).classList.add("edited-div");
  };

  const handleBlur = event => {
    document.getElementById(event.target.id).classList.remove("edited-div");
  };

  const handleProfileMode = () => {
    setProfileViewMode(!profileViewMode);
  };

  const updateUserProfile = async () => {
    setLoading(true);
    const token = window.localStorage.getItem("token");
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateProfile({
        variables: {
          token: token,
          profileInfo: {
            bio: description,
            twitter: twitterSocial,
            linkedin: linkedinSocial,
          },
        },
        // refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }],
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    handleProfileMode();
  };

  useEffect(() => {
    if (!profileViewMode) {
      document.getElementById("bio").focus();
    }
  }, [profileViewMode]);

  useEffect(() => {
    setDescription(
      results &&
        (results.bio ||
          "This is my sweet and short Bio. Few interesting things about me, or things I am interested at."),
    );
    setTtwitterSocial(
      results.twitter ? results.twitter : "https://twitter.com/your_handler",
    );
    setLinkedinSocial(
      results.linkedin
        ? results.linkedin
        : "https://www.linkedin.com/in/your_handler",
    );
  }, [results, results.bio, results.linkedin, results.twitter]);

  return (
    <ThemeProvider>
      <CSSReset />
      <Button
        leftIcon={IoIosArrowBack}
        variant="ghost"
        size="md"
        m="10px"
        onClick={() => {
          navigate("/snippets/list");
        }}
        variantColor="teal"
        _focus={{ outline: "none" }}
      >
        Back
      </Button>
      <Box maxW="1280px" m="auto">
        <Box as="section" pt={10}>
          <Container>
            <Box mb="40px" maxW="xl" mx="auto" px="10px" textAlign="center">
              <Avatar
                backgroundColor="none"
                borderWidth="1px"
                p="2px"
                size="2xl"
                name="Dynamic Name"
                src={avatar}
              />
              <Heading as="h2" m="20px" size="xl" fontWeight="bold">
                {fullName}
              </Heading>

              <Text
                p="5px"
                opacity="0.5"
                as="div"
                mb="5px"
                contenteditable="true"
                fontSize="md"
                backgroundColor={
                  profileViewMode
                    ? "none"
                    : colorMode === "dark"
                    ? "rgba(45,55,72, 0.3)"
                    : "#FFFFFF"
                }
              >
                <ContentEditable
                  onFocus={setFocusStyle}
                  onBlur={handleBlur}
                  id="bio"
                  html={description}
                  disabled={profileViewMode ? true : false}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  style={{
                    outline: "none",
                  }}
                />
              </Text>
            </Box>
            <Box
              minW="330px"
              w="95%"
              borderRadius="10px"
              backgroundColor={
                colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
              }
              maxW="800px"
              p="20px"
              m="auto"
            >
              <FormControl w="100%" isRequired={profileViewMode ? false : true}>
                <Stack w="100%" isInline flexWrap="wrap" spacing={8}>
                  <Box minW="300px">
                    <FormLabel fontSize="xs" htmlFor="email">
                      EMAIL ADDRESS
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        children={<Box as={MdMail} color="teal.400" />}
                      />
                      <Input
                        borderWidth="0px"
                        disabled
                        type="email"
                        value={results.email || "your email"}
                        focusBorderColor="teal.500"
                        background="none"
                      />
                    </InputGroup>
                  </Box>
                  {/* <Box w="50%" minW="300px">
                    <FormLabel fontSize="xs" htmlFor="fullname">
                      PASSWORD
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        children={<Box as={MdVpnKey} color="teal.400" />}
                      />
                      <Input
                        borderWidth="0px"
                        disabled
                        type={show ? "text" : "password"}
                        value="mypassword"
                        focusBorderColor="teal.500"
                        background="none"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          mr="3px"
                          h="1.75rem"
                          size="sm"
                          onClick={handleClick}
                          _focus={{ outline: "none" }}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box> */}
                </Stack>
              </FormControl>
              <Divider my="30px" />
              <Stack justifyContent="space-between" w="100%" spacing={8}>
                <Box w="50%" minW="300px">
                  <FormLabel fontSize="xs" htmlFor="email">
                    TWITTER
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={<Box as={FaTwitter} color="teal.400" />}
                    />
                    <Input
                      borderWidth={profileViewMode ? "0px" : "1px"}
                      disabled={profileViewMode ? true : false}
                      value={twitterSocial}
                      onChange={e => {
                        setTtwitterSocial(e.target.value);
                      }}
                      focusBorderColor="teal.500"
                      background="none"
                    />
                  </InputGroup>
                </Box>
                <Box w="50%" minW="300px">
                  <FormLabel fontSize="xs" htmlFor="email">
                    LINKEDIN
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      children={<Box as={FaLinkedin} color="teal.400" />}
                    />
                    <Input
                      borderWidth={profileViewMode ? "0px" : "1px"}
                      disabled={profileViewMode ? true : false}
                      value={linkedinSocial}
                      onChange={e => {
                        setLinkedinSocial(e.target.value);
                      }}
                      focusBorderColor="teal.500"
                      borderLeftColor="teal"
                      background="none"
                    />
                  </InputGroup>
                </Box>
              </Stack>
            </Box>
            <Flex
              pt="10px"
              maxW="800px"
              minH="60px"
              justifyContent="flex-end"
              m="auto"
            >
              {profileViewMode ? (
                <IconButton
                  variant="ghost"
                  variantColor="teal"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={FaEdit}
                  onClick={handleProfileMode}
                />
              ) : (
                <Box>
                  <Button
                    onClick={updateUserProfile}
                    size="md"
                    variantColor="teal"
                    mr="5px"
                    isLoading={loading}
                  >
                    Save
                  </Button>
                  <Button onClick={handleProfileMode} size="md">
                    Cancel
                  </Button>
                </Box>
              )}
            </Flex>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
