import React, { useState, useContext } from 'react'
import {
    Collapse,
    Badge,
    Box,
    Button,
    Text,
    Stack,
    useClipboard,
} from '@chakra-ui/core';
import SnippetContext from '../context/SnippetContext';
import { FaLink, FaEyeSlash, FaTwitter, FaGlobe } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md' 

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

const ShareOptions = ({shareId}) => {
    const [snippetPublicLink, setSnippetPublicLink] = useState(`https://codelify.dev/snippets/${shareId}`);
    const [isPublic, setIsPublic] = useState(false)
    const { onCopy, hasCopied } = useClipboard(`https://codelify.dev/snippets/${shareId}`);
    const toggleVisibility = () => {
        setIsPublic(!isPublic)
    }
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    };

    const editMode = useContext(SnippetContext);
    
    return(
        <Box p="10px">
        <Button mb="20px" _focus={{outline: "none"}} rightIcon={ show ? MdKeyboardArrowDown : MdKeyboardArrowUp } variant="link" size="sm" onClick={handleToggle}>
            Sharing options
        </Button>          
        <Collapse isOpen={show}>
            <Stack alignItems="center" justifyContent="flex-start" isInline>
                <Box mx="5px" as={FaLink} />
                <Text fontSize="sm">{snippetPublicLink}</Text>
                <Button onClick={onCopy} variantColor="gray" size="xs" _focus={{ outline: "none" }}>
                    {hasCopied ? "Copied" : "Copy link"}
                </Button>
            </Stack>
            <Stack py="10px" alignItems="center" justifyContent="flex-start" isInline>
                <Box mx="5px" as={FaTwitter} />
                <Text fontSize="sm">Publish on Twitter</Text>
            </Stack>
            {
                !editMode &&
                <Stack py="10px" alignItems="center" justifyContent="flex-start" isInline>
                    <Badge style={{cursor:"pointer"}} onClick={toggleVisibility} variantColor={isPublic ? "green" : "red"}>{isPublic ? <Public /> : <Private />}</Badge>
                </Stack>
            }
        </Collapse>
        </Box>
    )
}

export default ShareOptions;