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
    const description = 'This my sweet and short Bio. Few interesting things about me, or things I am interested at.'
    const [profileMode, setProfileMode] = useState('view');

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

            <Box as="section" pt={40} pb={50}>
            <Container
                backgroundColor={
                    colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
                } 
                p={10}
            >
                <Flex justifyContent="flex-end">
                <IconButton
                    variant="ghost"
                    variantColor="teal"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={FaEdit}
                    onClick={()=>{
                        setProfileMode("edit")
                    }}
                />
                </Flex>
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

                <Text focusBorderColor="teal.500" borderWidth={profileMode === "edit" ? "1px" : "none" } p="5px" borderRadius="5px" opacity="0.5" as="div" mb="5px" contenteditable="true" fontSize="md">
                <ContentEditable
                    html={description}
                    disabled={profileMode === "edit" ? false : true }
                    style={{
                    outline: "none"
                    }}
                />
                </Text>                
                </Box>
                <Box
                borderRadius="10px"
                backgroundColor={
                    colorMode === "light" ? "#FFFFFF" : "rgba(45,55,72, 0.1)"
                } 
                maxW="800px"
                p="20px"
                w="100%"
                m="auto"
                >
                <FormControl w="100%" isRequired={false}>
                    <Stack w="100%" spacing={8}>
                    <Box minW="300px">
                        <FormLabel fontSize="xs" htmlFor="email">EMAIL ADDRESS</FormLabel>
                        <InputGroup>
                            <InputLeftElement children={<Box as={MdMail} color="teal.400" />} />
                            <Input 
                            background="none" 
                            disabled={true} 
                            borderWidth="0px" 
                            type="email" 
                            value="haja.andri@gmail.com" 
                            focusBorderColor="teal" 
                            />
                        </InputGroup>
                    </Box>
                    <Box w="50%" minW="300px">
                        <FormLabel fontSize="xs" htmlFor="fullname">PASSWORD</FormLabel>
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                        </Button>
                        <InputGroup>
                        <InputLeftElement children={<Box as={MdVpnKey} color="teal.400" />} />
                        <Input
                            disabled
                            background="none"
                            borderWidth="0px"
                            type={show ? "text" : "password"}
                            value="mypassword"
                            focusBorderColor="teal.300"
                        />
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
                        background="none" 
                        disabled={true} 
                        borderWidth="0px" 
                        value="https://twitter.com/haja_andriam" 
                        focusBorderColor="#319795" 
                        />
                        </InputGroup>
                    </Box>
                    <Box w="50%" minW="300px">
                        <FormLabel fontSize="xs" htmlFor="email">LINKEDIN</FormLabel>
                        <InputGroup>
                        <InputLeftElement children={<Box as={FaLinkedin} color="teal.400" />} />
                        <Input 
                        background="none" 
                        disabled={true} 
                        borderWidth="0px" 
                        value="https://www.linkedin.com/in/haja-andriamaro/" 
                        focusBorderColor="teal.500" 
                        />
                        </InputGroup>
                    </Box>
                </Stack>
                </Box>
            </Container>
            </Box>
        </Box>
        </ThemeProvider>
    );
}

export default Profile;
