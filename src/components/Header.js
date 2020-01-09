import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useDisclosure,
  Button
} from '@chakra-ui/core';
import NewSnippet from './NewSnippet';
import { MdAdd } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import Logo from './Logo';
import SearchBox from './SearchBox';

const AppHeader = props => {
  console.log("Mode Landing" + props.landing)
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };

  const [size, setSize] = React.useState('md');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
    document.getElementById('FiHome').focus();
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
      {...props}
    >
      <Flex align="center" justify="center" w="100%">
        <Box maxWidth="1280px" w="100%" h="100%">
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
            {
              !props.landing && <SearchBox />
            }
            <Flex align="center" color="gray.500">
              { props.landing
                ? (
                  <Button as="a" size="xs" ml={4} href="/app" _focus={{outline: 'none'}}>Get Started</Button>
                ) 
                : (
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
                  fontSize={['18px', '20px', '20px', '20px']}
                  icon={FaUserAlt}
                  _focus={{
                    outline: "none",
                  }}
                />
                </>
                )
              }

              
              <IconButton
                aria-label={`Switch to ${
                  colorMode === 'light' ? 'dark' : 'light'
                } mode`}
                variant="ghost"
                color="current"
                ml="2"
                fontSize={['18px', '20px', '20px', '20px']}
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? 'moon' : 'sun'}
                _focus={{
                  outline: "none",
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