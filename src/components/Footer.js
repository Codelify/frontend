import React from "react";
import {
    Box,
    Image,
    Flex,
    Text,
} from "@chakra-ui/core";
import lambda from "../assets/img/Lambda-png.png"

const Footer = () => {
    return(
        <Box textAlign="center" pt="20px" pb="10" fontSize="xs">
            <Flex align="center" justify="center">
            <Text >
            Built during 
            </Text>
            <Image
                size="15px"
                objectFit="cover"
                src={lambda}
                alt="Lamba School logo"
                margin="5px"
                padding="1px"
            />  
            <Text>
            winter 2020 Hackathon
            </Text>
            </Flex>
        </Box>
    );
}

export default Footer