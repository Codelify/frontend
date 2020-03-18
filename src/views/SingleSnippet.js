import { 
    Box, 
    Flex, 
    useColorMode,
    ThemeProvider,
    CSSReset
} from "@chakra-ui/core";
import React from "react";
import UserBio from '../components/UserBio'
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";


const MainLayout = () => {
const { colorMode } = useColorMode();
return (
<ThemeProvider>
<CSSReset />
<Box pt="30px">
<UserBio />
    <Flex align="center" justifyContent="center" w="100%">
        <Box
        w="90%"
        px={["10px", "10px", "10px", "20px"]}
        borderRadius="10px"
        backgroundColor={
            colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
        }
        mt="50px"
        py="40px"
        >
            <CodeSnippet />
        </Box>
    </Flex>
    <Footer />
</Box>
</ThemeProvider>
);
};

export default MainLayout;