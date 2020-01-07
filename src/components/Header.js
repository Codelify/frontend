import React from 'react';
import {
  Box,
  Flex,
  Button,
  useColorMode,
} from "@chakra-ui/core";
import Logo from "./Logo";


const Header = props => {
  const { colorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };
  return (
    <Box
      pos="fixed"
      as="header"
      top="0"
      zIndex="4"
      // bg={bg[colorMode]}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="100%"
      height="4rem"
      mx="auto"
      bg={bg[colorMode]}
      {...props}
    >
      <Flex       
      align="center" 
      justify="center"
      w="100%"
      >
      <Box maxWidth="1280px" w="100%" h="100%" >
        <Flex size="100%" px="6" align="center" justify="space-between">
          <Box
            as="a"
            d="block"
            href="/"
            aria-label="Chakra UI, Back to homepage"
          >
            <Logo />
          </Box>
          <Flex align="center" color="gray.500">
                <Button
                    as="a"
                    size="xs"
                    ml={4}
                    href="/app"
                >
                    Get Started
                </Button>
          </Flex>
        </Flex>
      </Box>
      </Flex>
    </Box>
  );
};

export default Header;
