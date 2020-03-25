import React, { useEffect } from "react";
import { Event, PageView, initGA } from "../components/~common/Tracking";
import config from "../utils/config";
// import './App.css';
import {
  ThemeProvider,
  CSSReset,
  Box,
  Heading,
  Text,
  Button,
  Grid,
  Flex,
  useDisclosure,
  useColorMode,
  Stack,
} from "@chakra-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Feature from '../components/Features'
import Container from "../components/Container";
import RequestAccess from "../components/RequestAccess";
import GoogleButton from "../components/GoogleButton";
import { MdBookmark, MdFindInPage, MdDescription } from "react-icons/md";
import SlackButton from "../components/SlackButton";
import { handleRouteChange } from "../utils/handleRouteChange";
import Img from "react-image";
import isLoggedIn from '../utils/auth';
//import GoogleLogin from "react-google-login";

function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  
  useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
    PageView();
  }, []);

  return (
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
          <Box minWidth="340px" w="30%" as="section" pt={["40", "40", "30", "40"]} pb={50}>
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
                  Codelify give developers a central place to easily Store,
                  Manage and Retrieve code snippets they want to keep.
                </Text>

                <Box mt="6">
                  {isLoggedIn() && (
                    <Button
                      mr="10px"
                      size="lg"
                      as="a"
                      variantColor="teal"
                      href={handleRouteChange()}
                      _focus={{ outline: "none" }}
                    >
                      Browse my Snippets
                    </Button>
                  )}
                  {!isLoggedIn() && (
                    <>
                    <Box mb="20px">
                      <GoogleButton py="10px"/>                      
                    </Box>
                    <Text fontSize="sm">Pro</Text>
                    <Stack
                      borderTopWidth="1px"
                      pt="10px"
                      mx="3px"
                      spacing={4}
                      d="flex"
                      justifyContent="center"
                      isInline
                    >
                      <Button
                        size="lg"
                        _focus={{ outline: "none" }}
                        onClick={onOpen}
                        color="#718096"
                      >
                        Request Access
                      </Button>
                      <RequestAccess isOpen={isOpen} onClose={onClose} />
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
              src={colorMode === "light" ? "https://res.cloudinary.com/codelify/image/upload/f_auto,q_auto/v1583157283/app-shot-light_lp32ha.png" : "https://res.cloudinary.com/codelify/image/upload/f_auto,q_auto/v1583157270/app-shot-dark_jfiiqe.png"} 
              style={{
                animation: "float 6s ease-in-out infinite",
                borderRadius:"5px",
              }}/>
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
                Easily retrieve any snippets with a built in search engine based
                on Snippets Tags, Description, and Title ... So they you can
                reuse them anytime
              </Feature>
            </Grid>
          </Box>
        </Container>
        <Footer landing={true}/>
      </Box>
    </ThemeProvider>
  );
}

export default Landing;
