import React from "react";
import {
    Box,
} from "@chakra-ui/core";

const Container = (props) => {
    return(
        <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />
    );
}

export default Container