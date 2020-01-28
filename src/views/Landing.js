import React, { useEffect, useState } from "react";
import { Event, initGA, PageView } from "../components/~common/Tracking";
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
  Image,
  useDisclosure,
  Stack
} from "@chakra-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import RequestAccess from "../components/RequestAccess";
import GoogleButton from "../components/GoogleButton";
import { MdBookmark, MdFindInPage, MdDescription } from "react-icons/md";
import screeShot from "../assets/img/app-shot.png";
import SlackButton from "../components/SlackButton";
//import GoogleLogin from "react-google-login";

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box {...props}>
      <Flex
        rounded="full"
        size={20}
        bg="teal.500"
        align="center"
        justify="center"
      >
        <Box size={12} color="white" as={icon} />
      </Flex>
      <Heading as="h2" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
        {title}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
};

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    PageView();
    if (typeof window !== "undefined" && window.localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, [isLoggedIn]);

  return (
    <ThemeProvider>
      <CSSReset />
      <Box mb={20}>
        <Box as="section" pt={40} pb={50}>
          <Header landing={true} isLoggedIn={isLoggedIn} />
          <Container>
            <Box maxW="xl" mx="auto" textAlign="center">
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
                Codelify give to developers a central place to easily Store,
                Manage and Retrieve code snippets they want to keep and reuse.
              </Text>

              <Box mt="6">
                {isLoggedIn && (
                  <Button
                    mr="10px"
                    size="lg"
                    as="a"
                    variantColor="teal"
                    href="/app"
                    _focus={{ outline: "none" }}
                  >
                    Get Started
                  </Button>
                )}
                {!isLoggedIn && (
                  <Stack
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
                    >
                      Request Access
                    </Button>
                    <RequestAccess isOpen={isOpen} onClose={onClose} />
                    <GoogleButton />
                  </Stack>
                )}
              </Box>
            </Box>
          </Container>
        </Box>

        <Container>
          <Box
            style={{
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
            mx="auto"
            minWidth="330px"
            w="95%"
            maxW="1280px"
            borderRadius="5px"
          >
            <Image
              borderRadius="5px"
              src={screeShot}
              alt="Codelify app screenshot"
            />
          </Box>
        </Container>

        <Container mt="60px">
          <Box mx="10px">
            <Grid
              templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={10}
              px={{ md: 12 }}
            >
              <Feature icon={MdBookmark} title="Store">
                Code Snippets are everywhere in the developer info stream, on
                twitter, stack overflow, tutorials, medium/blog articles ...
                Codelify is the best place to store them all.
              </Feature>
              <Feature icon={MdDescription} title="Manage">
                Describe your snippets, assign meaningful Tags to each each of
                them, add the URL for context and futur reference.
              </Feature>
              <Feature icon={MdFindInPage} title="Retrieve">
                Easily retrieve any snippets with a built in search engine based
                on Snippets Tags and description... So they you can reuse them
                anytime
              </Feature>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default Landing;
