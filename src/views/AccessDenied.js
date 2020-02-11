import React, { useEffect, useState } from "react";
import { Event, PageView, initGA } from "../components/~common/Tracking";
import config from "../utils/config";
import {
    ThemeProvider,
    CSSReset,
    Box,
    Heading,
    Text,
    Button,
    Image,
    useDisclosure,
    useColorMode,
    Stack
} from "@chakra-ui/core";
import Header from "../components/Header";
import Container from "../components/Container";
import RequestAccess from "../components/RequestAccess";
import screenShotLight from "../assets/img/app-shot-light.png";
import screenShotDark from "../assets/img/app-shot-dark.png";
import SlackButton from "../components/SlackButton";
import { handleRouteChange } from "../utils/handleRouteChange";
import { GiMinotaur } from 'react-icons/gi'


function Landing() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const { isOpen, onOpen, onClose } = useDisclosure();
const { colorMode } = useColorMode();

useEffect(() => {
    initGA(config.googleAnalytics.apiKey);
    PageView();
    if (typeof window !== "undefined" && window.localStorage.getItem("token")) {
    setIsLoggedIn(true);
    } else setIsLoggedIn(false);
}, [isLoggedIn]);

return (
    <ThemeProvider>
    <CSSReset />
    <Box mb={20}>
        <Box as="section" pt={40} pb={50}>
        <Header  landing={true} isLoggedIn={isLoggedIn} />
        <Container>
            <Box maxW="xl" mx="auto" px="10px" textAlign="center">
            <Box m="auto" as={GiMinotaur} size="64px" color="#E53E3E" />
            <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                onClick={() =>
                Event("Test Category", "Test Action", "Test Label")
                }
            >
                Restricted access
            </Heading>
            <Text opacity="0.7" fontSize="lg" mt="6">
                Access to Codelify is currently restricted to some users.
                You can request an access using the form below to be added on our waiting list
            </Text>

            </Box>
        </Container>
        </Box>

    </Box>
    </ThemeProvider>
);
}

export default Landing;
