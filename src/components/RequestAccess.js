import React from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Stack
  } from "@chakra-ui/core";

const RequestAccess = ()=>{
    return(
        <FormControl isRequired>
        <Stack spacing={4}>
            <Box>
            <FormLabel htmlFor="full-name">Full name</FormLabel>
            <Input focusBorderColor="#319795" id="fname" placeholder="Dan Abramov" />
            </Box>
            <Box>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input focusBorderColor="#319795" placeholder="dan.abramov@reactjs.com" type="email" id="email" aria-describedby="email-helper-text" />
            <FormHelperText id="email-helper-text">
                We'll never share your email.
            </FormHelperText>      
            </Box>
        </Stack>
        </FormControl>
    );
}

export default RequestAccess;