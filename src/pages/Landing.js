import React, { useEffect } from "react";
import { Event, PageView, initGA } from "../utils/traking";
import config from "../utils/config";
import {
  ThemeProvider,
  CSSReset,
  Box,
  Heading,
  Text,
  Button,
  Grid,
  Flex,
  useColorMode,
  Stack
} from "@chakra-ui/core";
import Header from "../components/Elements/Header/Header";
import Footer from "../components/Elements/Footer";
import Feature from "../components/Elements/Features";
import Container from "../components/Elements/Container";
import GoogleButton from "../components/Auth/GoogleButton";
import GithubButton from "../components/Auth/GithubButton";
import {
  MdBookmark,
  MdFindInPage,
  MdDescription,
  MdExplore
} from "react-icons/md";
import SlackButton from "../components/Auth/SlackButton";
import Img from "react-image";
import isLoggedIn from "../utils/auth";
import { navigate } from "@reach/router";

import MetaTags from "../utils/metaTags";

function Landing({auth}) {
  const { colorMode } = useColorMode();

  useEffect(() => {
      initGA(config.googleAnalytics.apiKey);
      PageView();  
    // at this stage their is no value for users
    // to see the LP if they are already logged in
    // we redirect to /app
    if(auth) {
      navigate("/app")
    }
  }, [auth]);

  return (
    <>
      <MetaTags
        title="Codelify | Your code snippets library"
        keywords="Codelify, snippet"
      />
      <ThemeProvider>
        <CSSReset />
        <Box mb={20}>
          <Flex
            pt={["0px", "0px", "0px", "90px"]}
            maxW="1600px"
            m="auto"
            flexWrap="wrap"
            justifyContent="space-around"
          >
            <Box
              minWidth="340px"
              w="30%"
              as="section"
              pt={["40", "40", "30", "40"]}
              pb={50}
            >
              <Header landing={true} isLoggedIn={isLoggedIn()} />
              <Container>
                <Box maxW="xl" mx="auto" px="10px" textAlign="center">
                  <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    onClick={() =>
                      Event("Test Category", "Test Action", "Test Label")
                    }
                  >
                    Your
                    <Box as="span" color="teal.500">
                      {" "}
                      code snippets
                    </Box>{" "}
                    library
                  </Heading>

                  <Text opacity="0.7" fontSize="lg" mt="6">
                    We give developers a central place to easily Store, Manage,
                    Retrieve and Share code snippets.
                  </Text>

                  <Box mt="6">
                    {isLoggedIn() && (
                      <Button
                        size="lg"
                        variantColor="teal"
                        leftIcon={MdExplore}
                        onClick={() => {
                          navigate("/app");
                        }}
                        _focus={{ outline: "none" }}
                      >
                        Explore Snippets
                      </Button>
                    )}
                    {!isLoggedIn() && (
                      <>
                        <Stack
                          my={["30px", "30px", "30px", "30px"]}
                          justifyContent="center"
                          spacing={3}
                          isInline
                        >
                          <Box>
                            <GoogleButton py="10px" />
                          </Box>
                          <Box>
                            <GithubButton py="10px" />
                          </Box>
                        </Stack>
                        <Text m="auto" borderBottomWidth="1px" opacity="0.7" fontSize="sm" width="300px">
                          Team
                        </Text>
                        <Stack
                          pt="10px"
                          mx="3px"
                          spacing={4}
                          d="flex"
                          justifyContent="center"
                          isInline
                        >
                          {/* <Button
                            size="lg"
                            _focus={{ outline: "none" }}
                            onClick={onOpen}
                            color="#718096"
                          >
                            Request Access
                          </Button> */}
                          {/* <RequestAccess isOpen={isOpen} onClose={onClose} /> */}
                          <SlackButton />
                        </Stack>
                      </>
                    )}
                  </Box>
                </Box>
              </Container>
            </Box>

            <Container maxWidth="800px" mx="20px">
              <Img
                src={
                  colorMode === "light"
                    ? "https://res.cloudinary.com/codelify/image/upload/f_auto,q_auto/v1583157283/app-shot-light_lp32ha.png"
                    : "https://res.cloudinary.com/codelify/image/upload/f_auto,q_auto/v1583157270/app-shot-dark_jfiiqe.png"
                }
                style={{
                  animation: "float 6s ease-in-out infinite",
                  borderRadius: "5px"
                }}
              />
            </Container>
          </Flex>

          <Container
            maxW="1600px"
            m="auto"
            pt={["50px", "40px", "40px", "120px"]}
          >
            <Box mx="20px">
              <Grid
                templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
                gap={5}
                px={{ md: 12 }}
              >
                <Feature icon={MdBookmark} title="Store">
                  Code Snippets are everywhere in the developer info stream, on
                  twitter, stack overflow, tutorials, blog post ... Codelify is
                  the best place to store them all.
                </Feature>
                <Feature icon={MdDescription} title="Organise">
                  Describe your snippets, assign meaningful Tags and Description
                  to each of them. Add the URL for context and futur reference.
                  Set as fovorite ...
                </Feature>
                <Feature icon={MdFindInPage} title="Retrieve">
                  Easily retrieve any snippets with a built in search engine
                  based on Snippets Tags, Description, and Title ... So they you
                  can reuse them anytime
                </Feature>
              </Grid>
            </Box>
          </Container>
          <Footer landing={true} />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Landing;
