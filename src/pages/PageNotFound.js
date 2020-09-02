import React from "react";
import {
    ThemeProvider,
    CSSReset,
    Box,
    Heading,
    Text,
    Button,
} from "@chakra-ui/core";
import { navigate } from "@reach/router";
import Container from "../components/Elements/Container";
import { GiLandMine } from 'react-icons/gi';


function PageNotFound() {

return (
    <ThemeProvider>
    <CSSReset />
    <Box mb={20}>
        <Box as="section" pt={40} pb={50}>
        <Container>
            <Box maxW="xl" mx="auto" px="10px" textAlign="center">
            <Box m="auto" as={GiLandMine} size="64px" color="#F56565" />
            <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                onClick={() =>
                Event("Test Category", "Test Action", "Test Label")
                }
            >
                Ooops, empty land
            </Heading>
            <Text opacity="0.7" fontSize="lg" mt="6">
                Looks like there is nothing see out here :(
            </Text>

            <Box mt="6" >                
                <Button
                ml="3px"
                variantColor="teal"
                size="lg"
                _focus={{ outline: "none" }}
                onClick={() => {navigate('/')}}
                >
                Bring me to a known place
                </Button>
            </Box>
            </Box>
        </Container>
        </Box>

    </Box>
    </ThemeProvider>
);
}

export default PageNotFound;
