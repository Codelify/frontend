import React, { useEffect } from "react";
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
  MenuItem,
  Avatar,
  Text
} from "@chakra-ui/core";
import NewSnippet from "./NewSnippet";
import DialogModal from "./DialogModal"
import { MdAdd } from "react-icons/md";
import { FaUserAlt, FaRegNewspaper, FaGithubAlt, FaRegUser, FaSurprise } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";
import { handleRouteChange } from "../utils/handleRouteChange";
import useUserData from "./~common/useUserData";
import useSyncGist from "../hooks/useSyncGist";

const AppHeader = props => {
  const { landing, isLoggedIn, appView } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };
  const { results } = useUserData();

  const token = window.localStorage.getItem("token");
  // const avatar = window.localStorage.getItem("avatar")

  const [size, setSize] = React.useState("md");
  const [isAlert, setIsAlert] = React.useState(false);
  const [ alertMessage ,setAlertMessage] = React.useState("")
  const [isGitSynching, setIsGistSynching] = React.useState(false);
  const [isGitSyncError,setIsGitSyncError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gitUsername = "", gitAccessToken = "" } = results;
  const syncGistSnippet = useSyncGist({ gitUsername, gitAccessToken });

  const firstField = React.useRef();
  const avatar = results.avatar;
  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
    document.getElementById("FiHome").focus();
  };

  const onLogout = () => {
    // delete token
    window.localStorage.removeItem("token");

    // then direct to landing page
    navigate("/");
  };

  const changeRoute = () => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate(handleRouteChange());
    }
  };

  const handleGistSync = () => {
    setIsAlert(true);
  }

  useEffect(() => {
    async function triggerGitSync() {
      if(!gitUsername || !gitAccessToken) {
        setAlertMessage("You must be logged in with Github for this feature to work")
      }
      else {
        setAlertMessage("Wiring Github, synching in progress ...")
        setIsGitSyncError(await syncGistSnippet());
      }  
    }
    triggerGitSync();
  },[isGitSynching, gitUsername, gitAccessToken, syncGistSnippet]

  )

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
                  <>
                    <Menu autoSelect={false}>
                      <MenuButton
                        variant="ghost"
                        as={Button}
                        aria-label="Add new Snippet"
                        _focus={{
                          outline: "none"
                        }}
                        p={0}
                        m={0}
                      >
                          <Box as={MdAdd} size="32px"/>
                      </MenuButton>
                      <MenuList placement="bottom-end">
                        <MenuItem
                          onClick={() => {
                            handleClick("full");
                          }}
                        >
                          <Box mx="8px" as={FaRegNewspaper} size="16px"/>
                          <Text>New Snippet</Text>
                        </MenuItem>
                        <MenuItem onClick={handleGistSync}>
                          <Box mx="8px" as={FaGithubAlt} size="16px"/>
                          <Text>Import from Gist</Text>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </>
                )}

                {token && (
                  <Menu autoSelect={false}>
                    <MenuButton
                      mx="3px"
                      variant={avatar !== "" ? "unstyled" : "ghost"}
                      as={Button}
                      _focus={{
                        outline: "none"
                      }}
                    >
                      {avatar !== "" ? (
                        <Avatar
                          showBorder={true}
                          size="sm"
                          name=""
                          src={avatar}
                        />
                      ) : (
                        <Box as={FaUserAlt} />
                      )}
                    </MenuButton>
                    <MenuList placement="bottom-end">
                      <MenuItem
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        <Box mx="8px" as={FaRegUser} size="16px"/>
                        <Text>Profile</Text>
                      </MenuItem>
                      <MenuItem onClick={onLogout}>
                        <Box mx="8px" as={AiOutlineLogout} size="16px"/>
                        <Text>Logout</Text>                      
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}

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
        <NewSnippet
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          firstField={firstField}
          size={size}
          setSize={setSize}
        />
      </Box>
      <DialogModal 
      isOpen={isAlert}
      onClose={()=>{setIsAlert(false); setIsGitSyncError(false); setIsGistSynching(false)}} 
      dialogContent = { isGitSyncError ? "Ooops an error occured linking to gist" : alertMessage}
      dialogIcon={FaSurprise}
      cancelButton="OK"
      />
    </>
  );
};

export default AppHeader;