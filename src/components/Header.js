import React from "react";
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Avatar,
} from "@chakra-ui/core";
import NewSnippet from "./NewSnippet";
import { MdAdd } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";
import { handleRouteChange } from "../utils/handleRouteChange";

const AppHeader = props => {
  const { landing, isLoggedIn } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };

  const token = window.localStorage.getItem("token");
  const avatar = window.localStorage.getItem("avatar")

  const [size, setSize] = React.useState("md");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
    document.getElementById("FiHome").focus();
  };

  const onLogout = () => {
    // delete token
    window.localStorage.clear();
    // then direct to landing page
    navigate("/");
  };

  return (
    <Box
      pos="fixed"
      as="header"
      top="0"
      zIndex="4"
      bg={bg[colorMode]}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="100%"
      height="4rem"
      mx="auto"
      px="10px"
      {...props}
    >
      <Flex align="center" justify="center" w="100%">
        <Box maxWidth="1600px" w="100%" h="100%">
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
            {!landing && <SearchBox />}
            <Flex align="center" color="gray.500">
              {landing ? (
                isLoggedIn && (
                  <Button
                    as="a"
                    size="xs"
                    ml={4}
                    href={handleRouteChange()}
                    _focus={{ outline: "none" }}
                  >
                    Browse
                  </Button>
                )
              ) : (
                <>
                  <IconButton
                    variant="ghost"
                    aria-label="Call Sage"
                    fontSize={["20px", "30px", "30px", "30px"]}
                    icon={MdAdd}
                    _focus={{
                      outline: "none"
                    }}
                    onClick={() => {
                      handleClick("full");
                    }}
                  />
                  {token && (
                    <Menu autoSelect={false}>
                      <MenuButton 
                        variant={
                          avatar !== '' ? "unstyled" : "ghost"
                        }
                        as={Button}
                        _focus={{
                          outline: "none"
                        }}
                        >
                        {
                          avatar !== '' ? (
                            <Avatar showBorder={true} size="sm" name="" src={avatar} />
                          ):
                          (
                            <Box as={FaUserAlt} />
                          )
                        }
                      </MenuButton>
                      <MenuList>
                        <MenuGroup title="Account">
                          <MenuItem>My Profile</MenuItem>
                          <MenuItem onClick={onLogout}>Logout</MenuItem>
                        </MenuGroup>
                      </MenuList>
                    </Menu>
                  )}
                </>
              )}

              <IconButton
                aria-label={`Switch to ${
                  colorMode === "light" ? "dark" : "light"
                } mode`}
                variant="ghost"
                color="current"
                ml="2"
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
      <NewSnippet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        firstField={firstField}
        size={size}
        setSize={setSize}
      />
    </Box>
  );
};

export default AppHeader;
