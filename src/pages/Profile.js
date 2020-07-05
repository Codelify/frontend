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
  Switch
} from "@chakra-ui/core";
import ContentEditable from "react-contenteditable";
import { navigate } from "@reach/router";
import Container from "../components/Container";
import { IoIosArrowBack } from "react-icons/io";
import useUserData from "../components/~common/useUserData";
import { FaTwitter, FaLinkedin, FaEdit, FaRegSmileWink, FaRegSadTear, FaGithub } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PROFILE } from "../graphql/mutation";

import appImg from "../assets/img/app-shot-dark.png";
import MetaTags from "../components/MetaTags";

// import { MdVpnKey } from "react-icons/md";

function Profile() {
  const [description, setDescription] = useState("");
  const [twitterLink, setTtwitterLink] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [linkedinLink, setlinkedinLink] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [loading, setLoading] = useState(false);
  const { results } = useUserData();
  const { colorMode } = useColorMode();
  //   const [show, setShow] = React.useState(false);
  //   const handleClick = () => setShow(!show);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const avatar = results.avatar;
  const fullName = `${results.lastName || ''} ${results.firstName || ''}`;

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
    console.log(token)
    try {
      // eslint-disable-next-line no-empty-pattern
      const {} = await updateProfile({
        variables: {
          token: token,
          profileInfo: {
            bio: description,
            twitter: twitterLink,
            github: gitHubLink,
            linkedin: linkedinLink,
            enableNewsletter: subscription,
          },
        },
        // refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }],
      });
      setLoading(false);
    } catch (error) {
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
    setTtwitterLink(
      results.twitter ? results.twitter : "Link to your Twitter profile",
    );
    setGitHubLink(
      results.github ? results.github : "Link to your Github profile",
    );
    setlinkedinLink(
      results.linkedin
        ? results.linkedin
        : "Link to your LinkedIn profile",
    );
    setSubscription(
      results.enableNewsletter
      ? results.enableNewsletter
      : false
    )
  }, [results, results.bio, results.linkedin, results.twitter]);

  return (
    <>
      <MetaTags
        title="Twitter"
        description="Test Desc"
        propertyOgLocale="en_US"
        propertyOgType="article"
        propertyOgTitle="Test Title"
        propertyOgDescription="Aritcle Title"
        propertyOgUrl="http://fc3b76c7.ngrok.io/"
        propertyOgSiteName="COdelify"
        propertyOgImage={appImg}
        propertyOgImageWidth="1000"
        propertyOgImageHeight="667"
        propertyTwitterCard="summary_large_image"
        propertyTwitterTitle="Article Title"
        twitterTwitterDescription="Article Tweeter desc"
        propertyTwitterImage={appImg}
      />
      <ThemeProvider>
        <CSSReset />
        <Button
          leftIcon={IoIosArrowBack}
          variant="ghost"
          size="md"
          m="10px"
          onClick={() => {
            navigate("/app");
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
                <Heading as="h2" m="20px" size="xl">
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
                <FormControl
                  w="100%"
                  isRequired={profileViewMode ? false : true}
                >
                  <Stack w="100%" isInline flexWrap="wrap" spacing={8}>
                    <Box mb="20px" minW="300px">
                      <FormLabel fontSize="xs" htmlFor="email">
                        EMAIL ADDRESS
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          children={<Box as={MdMail} size="24px" color="teal.400" />}
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
                    <Stack w="40%" minW="300px">
                      <Stack alignItems="center" isInline>
                      <FormLabel fontSize="xs" htmlFor="fullname">
                        NEWSLETTER 
                      </FormLabel>
                      {
                        subscription ? <Box as={FaRegSmileWink} size="24px" color="teal.400"/> : <Box as={FaRegSadTear} size="24px" color="red.300"/>
                      }
                      </Stack>
                      <Switch isDisabled={profileViewMode} _focus={{outline:"none"}} w="auto" onChange={() =>{setSubscription(!subscription)}} isChecked={subscription} color="teal" size="md" />
                    </Stack>                    
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
                        children={<Box as={FaTwitter} size="24px" color="teal.400" />}
                      />
                      <Input
                        borderWidth={profileViewMode ? "0px" : "1px"}
                        disabled={profileViewMode ? true : false}
                        value={twitterLink}
                        onChange={e => {
                          setTtwitterLink(e.target.value);
                        }}
                        focusBorderColor="teal.500"
                        background="none"
                      />
                    </InputGroup>
                  </Box>
                  <Box w="50%" minW="300px">
                    <FormLabel fontSize="xs" htmlFor="email">
                      GITHUB
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        children={<Box as={FaGithub} size="24px" color="teal.400" />}
                      />
                      <Input
                        borderWidth={profileViewMode ? "0px" : "1px"}
                        disabled={profileViewMode ? true : false}
                        value={gitHubLink}
                        onChange={e => {
                          setGitHubLink(e.target.value);
                        }}
                        focusBorderColor="teal.500"
                        borderLeftColor="teal"
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
                        children={<Box as={FaLinkedin} size="24px" color="teal.400" />}
                      />
                      <Input
                        borderWidth={profileViewMode ? "0px" : "1px"}
                        disabled={profileViewMode ? true : false}
                        value={linkedinLink}
                        onChange={e => {
                          setlinkedinLink(e.target.value);
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
                  <Button
                    variant="ghost"
                    variantColor="teal"
                    aria-label="Edit Profile"
                    leftIcon={FaEdit}
                    onClick={handleProfileMode}
                  >
                    Edit Profile
                  </Button>
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
    </>
  );
}

export default Profile;
