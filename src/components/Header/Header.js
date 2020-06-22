import React from "react";
import { Box, Flex, IconButton, useColorMode, Button } from "@chakra-ui/core";
import ProfileMenu from "./ProfileMenu";
import AddSnippetMenu from "./AddSnippetMenu";
import Logo from "../Elements/Logo";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";
import { handleRouteChange } from "../../utils/handleRouteChange";

const AppHeader = props => {
  const { landing, isLoggedIn, appView } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };

  const token = window.localStorage.getItem("token");

  const changeRoute = () => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate(handleRouteChange());
    }
  };

  return (
    <>
      <Box
        pos={landing ? "absolute" : "fixed"}
        top="0"
        zIndex="4"
        bg={bg[colorMode]}
        left="0"
        right="0"
        borderBottomWidth="1px"
        width="100%"
        mx="auto"
        px="10px"
      >
        <Flex align="center" justify="center" w="100%">
          <Box mx="15px" my="10px" maxWidth="1600px" w="100%" h="100%">
            <Flex size="100%" align="center" justify="space-between">
              <Box
                minWidth="120px"
                as="a"
                d="block"
                href="/"
                aria-label="Chakra UI, Back to homepage"
              >
                <Logo />
              </Box>
              {appView && (
                <Box w="100%" display={["none", "block", "block", "block"]}>
                  <SearchBox />
                </Box>
              )}
              <Flex justifyContent="space-between" color="gray.500">
                {!appView ? (
                  !landing && (
                    <Button
                      as="a"
                      size="xs"
                      mx="10px"
                      variant="outline"
                      cursor="pointer"
                      onClick={changeRoute}
                      _focus={{ outline: "none" }}
                    >
                      {isLoggedIn ? "MY SNIPPETS" : "Login"}
                    </Button>
                  )
                ) : (
                  <AddSnippetMenu />
                )}

                {token && <ProfileMenu />}

                <IconButton
                  aria-label={`Switch to ${
                    colorMode === "light" ? "dark" : "light"
                  } mode`}
                  variant="ghost"
                  color="current"
                  fontSize={["18px", "20px", "20px", "20px"]}
                  onClick={toggleColorMode}
                  icon={colorMode === "light" ? "moon" : "sun"}
                  _focus={{
                    outline: "none"
                  }}
                />
                {/* <MobileNav /> */}
              </Flex>
            </Flex>
          </Box>
        </Flex>
        {!landing && appView && (
          <Box pb="10px" display={["block", "none", "none", "none"]}>
            <SearchBox />
          </Box>
        )}
      </Box>
    </>
  );
};

export default AppHeader;
