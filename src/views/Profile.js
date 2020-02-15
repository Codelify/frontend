import React from "react";
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
    InputRightElement,
    InputGroup,
    Divider,
} from "@chakra-ui/core";
import { navigate } from "@reach/router";
import Container from "../components/Container";
import { IoIosArrowBack } from "react-icons/io";
import useUserData from "../components/~common/useUserData";
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { MdVpnKey } from 'react-icons/md'

function Profile() {

    const { results } = useUserData();
    const avatar = results.avatar;
    const { colorMode } = useColorMode();
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);    

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
                    onClick={() =>
                    Event("Test Category", "Test Action", "Test Label")
                    }
                >
                    Haja Andriamaro
                </Heading>
                <Text opacity="0.7" fontSize="lg" mt="6">
                    This my sweet and short Bio. Few interesting things about me, or
                    things I am interested at.
                </Text>
                </Box>
                <Box
                borderRadius="10px"
                backgroundColor={
                    colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
                } 
                maxW="800px"
                p="20px"
                w="100%"
                m="auto"
                >
                <FormControl w="100%" isRequired={false}>
                    <Stack justifyContent="space-between" w="100%" isInline spacing={4}>
                    <Box minW="300px">
                        <FormLabel fontSize="xs" opacity="0.4" htmlFor="email">EMAIL ADDRESS</FormLabel>
                        <InputGroup>
                        <InputLeftElement children={<Box as={MdMail} color="teal.400" />} />
                        <Input type="email" value="haja.andri@gmail.com" focusBorderColor="#319795" />
                        </InputGroup>
                    </Box>
                    <Box minW="300px">
                        <FormLabel fontSize="xs" opacity="0.4" htmlFor="fullname">PASSWORD</FormLabel>
                        <InputGroup size="md">
                        <InputLeftElement children={<Box as={MdVpnKey} color="teal.500" />} />
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            value="mypassword"
                            focusBorderColor="teal.300"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                        </InputGroup>

                    </Box>
                    </Stack>
                </FormControl>
                <Divider my="30px" />
                <Stack justifyContent="space-between" w="100%" spacing={4}>
                    <Box w="50%" minW="300px">
                        <FormLabel fontSize="xs" opacity="0.4" htmlFor="email">TWITTER</FormLabel>
                        <InputGroup>
                        <InputLeftElement children={<Box as={FaTwitter} color="teal.400" />} />
                        <Input placeholder="Phone number" focusBorderColor="#319795" />
                        </InputGroup>
                    </Box>
                    <Box w="50%" minW="300px">
                        <FormLabel fontSize="xs" opacity="0.4" htmlFor="email">LINKEDIN</FormLabel>
                        <InputGroup>
                        <InputLeftElement children={<Box as={FaLinkedin} color="teal.400" />} />
                        <Input placeholder="Phone number" focusBorderColor="teal.500" />
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
