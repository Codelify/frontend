import React, { useEffect } from "react";
import {
    Box,
    Flex,
    Input,
    Button,
    Stack,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/core";
import { PageView } from "./~common/Tracking";
import GoogleButton from "./GoogleButton";

const LoginForm = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

useEffect(() => {
    PageView();
}, []);

return (
        <Flex
        rounded="5px"
        mt="20px"
        borderWidth="1px"
        justify="center"
        w="100%"
        minWidth="300px"
        py="20px"
        >
        <FormControl isRequired>
            <Stack maxWidth="320px" spacing="24px">
            <Box>
                <FormLabel htmlFor="fname">User Name</FormLabel>
                <Input id="fname" placeholder="User name" />
            </Box>
            <Box>
                <FormLabel htmlFor="fname">Password</FormLabel>

                <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                </InputGroup>
            </Box>
            <Flex mt="30px" justify="flex-end">
                <Button size="md" variantColor="teal" mr={2}>
                Submit
                </Button>
                <GoogleButton />
            </Flex>
            </Stack>
        </FormControl>
        </Flex>
    );
};

export default LoginForm;