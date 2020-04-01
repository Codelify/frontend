import React from "react";
import {
    Box,
    Link,
    Flex,
    Text,
    Stack,
} from "@chakra-ui/core";
import { FaTwitter } from "react-icons/fa"

const Footer = ({ landing=false }) => {
    return(
        <Box my="10px" opacity="0.7" pt="40px" width="100%" fontSize="xs">
            <Flex align="center" justify="center">
            <Link _focus={{outline: "none"}} href="http://bit.ly/code-twit" isExternal>
            <Stack alignItems="center" isInline>
                <Text>Find us on Twitter</Text> <Box color="teal.400" size="16px" as={FaTwitter} /> <Text>@Codelify_dev</Text>
            </Stack>
            </Link>            
            </Flex>
        </Box>
    );
}

export default Footer