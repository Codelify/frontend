import React from 'react';
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
} from '@chakra-ui/core';
import NewSnippet from './NewSnippet';
import { MdAdd } from 'react-icons/md';
import { FaUserAlt, FaGithubAlt } from 'react-icons/fa';
import Logo from './Logo';
import SearchBox from './SearchBox';
import { navigate } from '@reach/router';
import { handleRouteChange } from '../utils/handleRouteChange';
import useUserData from './~common/useUserData';
import useSyncGist from '../hooks/useSyncGist'

const AppHeader = (props) => {
  const { landing, isLoggedIn, appView } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };
  const { results } = useUserData();

  const token = window.localStorage.getItem('token');
  // const avatar = window.localStorage.getItem("avatar")

  const [size, setSize] = React.useState('md');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gitUsername = '', gitAccessToken = ''} = results
  const syncGistSnippet = useSyncGist({gitUsername, gitAccessToken});
 
  const firstField = React.useRef();
  const avatar = results.avatar;
  const handleClick = (newSize) => {
    setSize(newSize);
    onOpen();
    document.getElementById('FiHome').focus();
  };

  const onLogout = () => {
    // delete token
    window.localStorage.removeItem('token');

    // then direct to landing page
    navigate('/');
  };
  
  const changeRoute = () => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      navigate(handleRouteChange());
    }
  };

  return (
    <>
      <Box
        pos={landing ? 'absolute' : 'fixed'}
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
                <Box w="100%" display={['none', 'block', 'block', 'block']}>
                  <SearchBox />
                </Box>
              )}
              <Flex align="center" color="gray.500">
                {!appView ? (
                  !landing && (
                    <Button
                      as="a"
                      size="xs"
                      mx="10px"
                      variant="outline"
                      cursor="pointer"
                      onClick={changeRoute}
                      _focus={{ outline: 'none' }}
                    >
                      {isLoggedIn ? 'MY SNIPPETS' : 'Login'}
                    </Button>
                  )
                ) : (
                  <>
                    <IconButton
                      variant="ghost"
                      aria-label="Call Sage"
                      fontSize={['20px', '30px', '30px', '30px']}
                      icon={MdAdd}
                      _focus={{
                        outline: 'none',
                      }}
                      onClick={() => {
                        handleClick('full');
                      }}
                    />
                    <IconButton
                      variant="ghost"
                      aria-label="Call Sage"
                      fontSize={['20px', '30px', '30px', '30px']}
                      icon={FaGithubAlt}
                      _focus={{
                        outline: 'none',
                      }}
                      onClick={syncGistSnippet}
                    />
                  </>
                )}

                {token && (
                  <Menu autoSelect={false}>
                    <MenuButton
                      variant={avatar !== '' ? 'unstyled' : 'ghost'}
                      as={Button}
                      _focus={{
                        outline: 'none',
                      }}
                    >
                      {avatar !== '' ? (
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
                          navigate('/profile');
                        }}
                      >
                        My Profile
                      </MenuItem>
                      <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                )}

                <IconButton
                  aria-label={`Switch to ${
                    colorMode === 'light' ? 'dark' : 'light'
                  } mode`}
                  variant="ghost"
                  color="current"
                  fontSize={['18px', '20px', '20px', '20px']}
                  onClick={toggleColorMode}
                  icon={colorMode === 'light' ? 'moon' : 'sun'}
                  _focus={{
                    outline: 'none',
                  }}
                />
                {/* <MobileNav /> */}
              </Flex>
            </Flex>
          </Box>
        </Flex>
        {!landing && appView && (
          <Box pb="10px" display={['block', 'none', 'none', 'none']}>
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
    </>
  );
};

export default AppHeader;
