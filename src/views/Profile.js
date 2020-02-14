import React from "react";
import {
    ThemeProvider,
    CSSReset,
    Box,
    Heading,
    Text,
    Button,
    useDisclosure,
    Avatar
} from "@chakra-ui/core";
import { navigate } from "@reach/router";
import Container from "../components/Container";
import { IoIosArrowBack } from 'react-icons/io'
import useUserData from "../components/~common/useUserData";


function Profile() {
const { isOpen, onOpen, onClose } = useDisclosure();
const { results } = useUserData();
console.dir(results);
const avatar = results.avatar;

return (
    <ThemeProvider>
    <CSSReset />
    <Box>
        <Button 
            leftIcon={IoIosArrowBack}
            variant="ghost"
            size="md"
            m="10px"
            onClick={() => {navigate('/snippets/list')}}
            variantColor="teal"
            _focus={{ outline: "none" }}
            >
            Back
        </Button>
        <Box as="section" pt={40} pb={50}>
        <Container>
            <Box maxW="xl" mx="auto" px="10px" textAlign="center">
            <Avatar backgroundColor="none" borderWidth="1px" p="2px" size="2xl" name="Dynamic Name" src={avatar} />
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
                This my sweet and short Bio. Few interesting things about me,
                or things I am interested at.
            </Text>
            </Box>
            <Box borderRadius="10px" backgroundColor="#FAFAFA" borderWidth="1px" maxW="800px" p="5px" w="100%" m="auto">

            </Box>
        </Container>
        </Box>

    </Box>
    </ThemeProvider>
);
}

export default Profile;