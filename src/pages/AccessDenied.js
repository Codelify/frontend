import React from "react";
import {
    ThemeProvider,
    CSSReset,
    Box,
    Heading,
    Text,
    Button,
    useDisclosure,
} from "@chakra-ui/core";
import { navigate } from "@reach/router";
import Container from "../components/Elements/Container";
import RequestAccess from "../components/Elements/views/RequestAccess";
import { GiMinotaur } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io'


function AccessDenied() {
const { isOpen, onOpen, onClose } = useDisclosure();

return (
    <ThemeProvider>
    <CSSReset />
    <Box mb={20}>
        <Button 
            leftIcon={IoIosArrowBack}
            variant="ghost"
            size="md"
            m="10px"
            onClick={() => {navigate('/')}}
            variantColor="teal"
            _focus={{ outline: "none" }}
            >
            Back
        </Button>
        <Box as="section" pt={40} pb={50}>
        <Container>
            <Box maxW="xl" mx="auto" px="10px" textAlign="center">
            <Box m="auto" as={GiMinotaur} size="64px" color="#F56565" />
            <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                onClick={() =>
                Event("Test Category", "Test Action", "Test Label")
                }
            >
                Restricted Access
            </Heading>
            <Text opacity="0.7" fontSize="lg" mt="6">
                Access to Codelify is currently restricted to some users only.
                You can request an access to be added on our waiting list
            </Text>

            <Box mt="6" >                
                <Button
                ml="3px"
                variantColor="teal"
                size="lg"
                _focus={{ outline: "none" }}
                onClick={onOpen}
                >
                Request Access
                </Button>
                <RequestAccess isOpen={isOpen} onClose={onClose} />
            </Box>
            </Box>
        </Container>
        </Box>

    </Box>
    </ThemeProvider>
);
}

export default AccessDenied;
