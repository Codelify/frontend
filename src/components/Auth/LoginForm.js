import React, { useEffect } from "react";
import {
    Box,
    Text,
    Input,
    Button,
    Stack,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement,
    Divider,
} from "@chakra-ui/core";
import { PageView } from "../~common/Tracking";
import GoogleButton from "./GoogleButton";
import SlackButton from "./SlackButton";

const LoginForm = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

useEffect(() => {
    PageView();
}, []);

return (
        <FormControl isRequired>
            <Stack maxWidth="350px"  borderWidth="1px" spacing="2px">
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
            <Button size="md" variantColor="teal">
                Submit
            </Button>
            <Text textAlign="center">OR</Text>
            <Divider />
                <GoogleButton/>
                <SlackButton/>
            </Stack>
        </FormControl>
    );
};

export default LoginForm;