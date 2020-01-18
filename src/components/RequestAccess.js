import React, { useState} from 'react';
import axios from 'axios'
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
    Button,
} from "@chakra-ui/core";
import config from '../utils/config'

const RequestAccess = ({isOpen, onClose})=>{
    const [formData, setFormData] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        console.dir(formData)
        axios({
            method: 'post',
            url: `https://usX.api.mailchimp.com/3.0/lists`,
            user: {"anystring": config.mailchimp.apiKey},
            header: 'content-type: application/json',
            data: {
                "email_address": formData.email,
                "status": "subscribed",
                "merge_fields": {
                    "FULLNAME": formData.fullname,
                }
            }
        })
        .then(function(response) {
            console.log("data" + response.data);
            console.log("status" + response.status);
            console.log("statusText" + response.statusText);
            console.log("headers" + response.headers);
            console.log("config" + response.config);
        })  
        .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        });
    }



    

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return(
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
            <ModalContent py="20px" borderRadius="5px" >
                <ModalCloseButton _focus={{ outline: "none" }}/>
                <ModalBody>   
            <FormControl isRequired>
            <Stack spacing={4}>
                <Box>
                    <FormLabel htmlFor="fullname">Full name</FormLabel>
                    <Input 
                    name="fullname" 
                    focusBorderColor="#319795" 
                    id="fname" 
                    placeholder="Dan Abramov" 
                    onChange={handleChange}
                    />              
                </Box>
                <Box>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input 
                    name="email"  
                    focusBorderColor="#319795" 
                    placeholder="dan.abramov@reactjs.com" 
                    type="email" 
                    id="email" 
                    aria-describedby="email-helper-text" 
                    onChange={handleChange}
                />
                <FormHelperText id="email-helper-text">
                    We'll never share your email.
                </FormHelperText>      
                </Box>
            </Stack>
            </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button _focus={{ outline: "none" }} variantColor="teal" mr={3} type="submit">
                    Add me to the list
                </Button>
                <Button _focus={{ outline: "none" }} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </form>
        </Modal>        
    );
}

export default RequestAccess;