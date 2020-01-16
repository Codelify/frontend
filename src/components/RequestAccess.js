import React from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from "@chakra-ui/core";

const RequestAccess = ({isOpen, onClose})=>{

    return(
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent py="20px" borderRadius="5px" >
            <ModalCloseButton _focus={{ outline: "none" }}/>
            <ModalBody>        
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
        </ModalBody>
        <ModalFooter>
            <Button variantColor="teal" mr={3} type="submit">
                Add me to the list
            </Button>
            <Button>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>        
    );
}

export default RequestAccess;