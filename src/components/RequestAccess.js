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
    Alert,
    AlertIcon
} from "@chakra-ui/core";
import config from '../utils/config'

const RequestAccess = ({isOpen, onClose})=>{
    const [ formData, setFormData ] = useState({});
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        const params = {
            method: 'post',
            url: `https://api.moosend.com/v3/subscribers/${config.mooSend.listId}/subscribe.json?apikey=${config.mooSend.apiKey}`,
            headers: {
                "Content-Type":'application/json',
                "Accept":'application/json'
            },
            data: {
                "Email": formData.email,
                "Name": formData.fullname,
            }
        };
        axios(params)
        .then(function(response) {
            setIsLoading(false);
            if(response.data.Error){
                setError(true)
            }
            else setSuccess(true)
        })  
        .catch(function (error) {
            setIsLoading(false)
            if(error.response || error.request ) {
                setError(true)
            }
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
                    {
                        error ? (
                            <Alert borderRadius="5px" mt="40px" status="error">
                            <AlertIcon />
                                There was an error processing your request.<br/>
                                Please try again later.
                            </Alert>
                        ) :
                        (
                            success ? (
                                <Alert borderRadius="5px" mt="40px" status="success">
                                <AlertIcon />
                                    Your request for access has been recorder. Stay tuned!
                                </Alert>                        
                            ) :
                            (
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
                            )    
                        )
                    }
                </ModalBody>
            <ModalFooter>
                {
                    error ? (
                        <Button _focus={{ outline: "none" }} onClick={onClose}>Close</Button>
                    ) :
                    !success &&
                    (
                        <>
                        <Button 
                        _focus={{ outline: "none" }} 
                        variantColor="teal" 
                        mr={3} 
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Submitting"
                        >
                        Add me to the list
                        </Button>
                        <Button _focus={{ outline: "none" }} onClick={onClose}>Cancel</Button>    
                        </>
                    )
                }
                </ModalFooter>
            </ModalContent>
        </form>
        </Modal>        
    );
}

export default RequestAccess;