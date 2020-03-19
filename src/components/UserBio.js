import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    Text,
    Avatar,
} from "@chakra-ui/core";
import ContentEditable from "react-contenteditable";
import Container from "../components/Container";
import useUserData from "../components/~common/useUserData";

function UserBio() {
    const [description, setDescription] = useState("");
    const { results } = useUserData();

    const avatar = results.avatar;
    const fullName = `${results.lastName} ${results.firstName}`;


    const setFocusStyle = event => {
        document.getElementById(event.target.id).classList.add("edited-div");
    };

    const handleBlur = event => {
        document.getElementById(event.target.id).classList.remove("edited-div");
    };

    useEffect(() => {
        setDescription(
        results &&
            (results.bio ||
            "This user has not updated his bio yet"),
        );
    }, [results.bio, results]);

    return (
        <Container>
            <Box maxW="xl" mx="auto" px="10px" textAlign="center">
            <Avatar
                backgroundColor="none"
                borderWidth="1px"
                p="2px"
                size="2xl"
                name="Dynamic Name"
                src={avatar}
            />
            <Heading as="h2" m="20px" size="xl" fontWeight="bold">
                {fullName}
            </Heading>
            <Text
                p="5px"
                opacity="0.5"
                as="div"
                mb="5px"
                contenteditable="true"
                fontSize="md"
            >
                <ContentEditable
                onFocus={setFocusStyle}
                onBlur={handleBlur}
                id="bio"
                html={description}
                disabled={true}
                onChange={e => {
                    setDescription(e.target.value);
                }}
                style={{
                    outline: "none",
                }}
                />
            </Text>
            </Box>
        </Container>
    );
}

export default UserBio;
