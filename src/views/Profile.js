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
    IconButton,
    InputRightElement
} from "@chakra-ui/core";
import ContentEditable from "react-contenteditable";
import { navigate } from "@reach/router";
import Container from "../components/Container";
import { IoIosArrowBack } from "react-icons/io";
import useUserData from "../components/~common/useUserData";
import { FaTwitter, FaLinkedin, FaEdit } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { MdVpnKey } from 'react-icons/md'

function Profile() {

    const { results } = useUserData();
    const avatar = results.avatar;
    const { colorMode } = useColorMode();
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);    
    const bio = 'This my sweet and short Bio. Few interesting things about me, or things I am interested at.'
    const [profileViewMode, setProfileViewMode] = useState(true);

    const setFocusStyle = (event) => {
        document.getElementById(event.target.id).classList.add("edited-div");
    }

    const handleBlur = event => {
        console.log("called")
        document.getElementById(event.target.id).classList.remove("edited-div");
    };    

    const handleProfileMode = () => {
        setProfileViewMode(!profileViewMode)
    }

    useEffect(() => {
        if(!profileViewMode){
            document.getElementById("bio").focus();
        }
    }, [profileViewMode]
    )

    return (
        <ThemeProvider>
        <CSSReset />
            <Button
            leftIcon={IoIosArrowBack}
            variant="ghost"
            size="md"
            m="10px"
            onClick={() => {
                navigate("/snippets/list");
            }}
            variantColor="teal"
            _focus={{ outline: "none" }}
            >
            Back
            </Button>        
            <Box                 
                maxW="1280px" m="auto">

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
                    <Heading
                        as="h2"
                        m="20px"
                        size="xl"
                        fontWeight="bold"
                    >
                        Haja Andriamaro
                    </Heading>

                    <Text 
                        p="5px" 
                        opacity="0.5" 
                        as="div" 
                        mb="5px" 
                        contenteditable="true" 
                        fontSize="md"
                        backgroundColor={ 
                            profileViewMode ? 
                            ( "none" )
                            :
                            (
                                colorMode === 'dark' ? (
                                    "rgba(45,55,72, 0.3)"
                                ): (
                                    "#FFFFFF"
                                )
                            )
                        }
                    >
                    <ContentEditable
                        onFocus={setFocusStyle}
                        onBlur={handleBlur}
                        id="bio"
                        html={bio}
                        disabled={ profileViewMode ? true  : false }
                        style={{
                        outline: "none"
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
                    <FormControl w="100%" isRequired={profileViewMode ? false : true }>
                        <Stack w="100%" isInline flexWrap="wrap" spacing={8}>
                        <Box minW="300px">
                            <FormLabel fontSize="xs" htmlFor="email">EMAIL ADDRESS</FormLabel>
                            <InputGroup>
                                <InputLeftElement children={<Box as={MdMail} color="teal.400" />} />
                                <Input 
                                borderWidth="0px" 
                                disabled 
                                type="email" 
                                value="haja.andri@gmail.com" 
                                focusBorderColor="teal.500" 
                                background="none"
                                />
                            </InputGroup>
                        </Box>
                        <Box w="50%" minW="300px">
                            <FormLabel fontSize="xs" htmlFor="fullname">PASSWORD</FormLabel>
                            <InputGroup>
                            <InputLeftElement children={<Box as={MdVpnKey} color="teal.400" />} />
                            <Input
                                borderWidth="0px" 
                                disabled 
                                type={show ? "text" : "password"}
                                value="mypassword"
                                focusBorderColor="teal.500"
                                background="none"
                            />
                            <InputRightElement width="4.5rem">
                                <Button mr="3px" h="1.75rem" size="sm" onClick={handleClick} _focus={{ outline: "none" }}>
                                        {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                            </InputGroup>
                        </Box>
                        </Stack>
                    </FormControl>
                    <Divider my="30px" />
                    <Stack justifyContent="space-between" w="100%" spacing={8}>
                        <Box w="50%" minW="300px">
                            <FormLabel fontSize="xs" htmlFor="email">TWITTER</FormLabel>
                            <InputGroup>
                            <InputLeftElement children={<Box as={FaTwitter} color="teal.400" />} />
                            <Input 
                                borderWidth={profileViewMode ? "0px" : "1px" } 
                                disabled={profileViewMode ? true : false } 
                                value="https://twitter.com/haja_andriam" 
                                focusBorderColor="teal.500" 
                                background="none"
                            />
                            </InputGroup>
                        </Box>
                        <Box w="50%" minW="300px">
                            <FormLabel fontSize="xs" htmlFor="email">LINKEDIN</FormLabel>
                            <InputGroup>
                            <InputLeftElement children={<Box as={FaLinkedin} color="teal.400" />} />
                            <Input 
                                borderWidth={profileViewMode ? "0px" : "1px" } 
                                disabled={profileViewMode ? true : false } 
                                value="https://www.linkedin.com/in/haja-andriamaro/" 
                                focusBorderColor="teal.500" 
                                borderLeftColor="teal"
                                background="none"
                            />
                            </InputGroup>
                        </Box>
                    </Stack>
                    </Box>
                    <Flex pt="10px" maxW="800px" minH="60px" justifyContent="flex-end" m="auto">
                        {
                            profileViewMode ?
                            (
                                <IconButton
                                variant="ghost"
                                variantColor="teal"
                                aria-label="Call Sage"
                                fontSize="20px"
                                icon={FaEdit}
                                onClick={handleProfileMode}
                            />
                            ):
                            (
                                <Box>
                                    <Button size="md" variantColor="teal" mr="5px">
                                    Save
                                    </Button>
                                    <Button onClick={handleProfileMode} size="md">Cancel</Button>
                                </Box>
                            )
                        }
                    </Flex>
            </Container>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default Profile;
