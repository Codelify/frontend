import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  useColorMode,
} from "@chakra-ui/core";

const Feature = ({ title, icon, children, ...props }) => {
    const { colorMode } = useColorMode();

    return (
        <Box
        backgroundColor={
            colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
        }
        borderRadius="5px"
        p="15px"
        d="flex"
        alignItems="flex-start"
        {...props}
        >
        <Box>
            <Flex size="64px" align="center" justify="center">
            <Box size={40} color="teal.300" as={icon} />
            </Flex>
        </Box>
        <Box ml="10px">
            <Heading as="h2" size="md" fontWeight="semibold" mt="0em" mb="0.5em">
            {title}
            </Heading>
            <Text opacity="0.7">{children}</Text>
        </Box>
        </Box>
    );
};

export default Feature;