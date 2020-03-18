import { Box, Flex, useColorMode } from "@chakra-ui/core";
import React from "react";
// import Header from "../components/Header";
import Footer from "../components/Footer";
import CodeSnippet from "../components/CodeSnippet";


const MainLayout = () => {
const { colorMode } = useColorMode();
return (
<Box>
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
);
};

export default MainLayout;