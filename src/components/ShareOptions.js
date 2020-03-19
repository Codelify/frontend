import React, { useState } from 'react'
import {
    Collapse,
    Badge,
    Box,
    Button,
    Text,
    Stack,
    useClipboard,
} from '@chakra-ui/core';
import { FaLink, FaEyeSlash, FaTwitter, FaGlobe } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md' ;
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";

const Private = () => {
    return(
        <Stack p="3px" isInline alignItems="center">
            <Box fontSize="md" as={FaEyeSlash } color="red.400" />
            <Text>Private</Text>
        </Stack>
    )
}

const Public = () => {
    return(
        <Stack p="3px" isInline alignItems="center">
            <Box fontSize="md" as={FaGlobe} color="green.400" />
            <Text>Public</Text>
        </Stack>
    )
}

const ShareOptions = ({isPublic, shareId, id}) => {
    const snippetPublicLink = `https://codelify.dev/snippets/${shareId}`;
    const { onCopy, hasCopied } = useClipboard(snippetPublicLink);
    const [visible, setVisible] = useState(isPublic);
    const [updateSnippet] = useMutation(UPDATE_SNIPPET);
    
    const toggleVisibility = async () => {
        setVisible(!visible)
        const token = window.localStorage.getItem("token");
        try {
            // eslint-disable-next-line no-empty-pattern
            const {} = await updateSnippet({
                variables: {
                snippetId: id,
                snippetInfo: { isPublic: !visible },
                token: token
                },
                refetchQueries: [{ query: MY_SNIPPETs, variables: { token } }]
            });
            } 
        catch (error) {
            console.log(error);
            }        
    }
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    };
    
    return(
        <>
        <Button mb="20px" _focus={{outline: "none"}} rightIcon={ show ? MdKeyboardArrowDown : MdKeyboardArrowUp } variant="link" size="sm" onClick={handleToggle}>
            Sharing options
        </Button>          
        <Collapse isOpen={show}>
            <Stack alignItems="center" justifyContent="flex-start" isInline>
                <Box mx="5px" as={FaLink} />
                <Text style={{overflow:"hidden"}} fontSize="sm">{snippetPublicLink}</Text>
                <Button onClick={onCopy} variantColor="gray" size="xs" _focus={{ outline: "none" }}>
                    {hasCopied ? "Copied" : "Copy link"}
                </Button>
            </Stack>
            <Stack py="10px" alignItems="center" justifyContent="flex-start" isInline>
                <Box mx="5px" as={FaTwitter} />
                <Text fontSize="sm">Publish on Twitter</Text>
            </Stack>
            <Stack py="10px" alignItems="center" justifyContent="flex-start" isInline>
                <Badge style={{cursor:"pointer"}} onClick={toggleVisibility} variantColor={visible ? "green" : "red"}>{visible ? <Public /> : <Private />}</Badge>
            </Stack>
        </Collapse>
        </>
    )
}

export default ShareOptions;