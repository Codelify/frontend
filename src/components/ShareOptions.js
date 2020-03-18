import React, { useState } from 'react'
import {
    Badge,
    Box,
    Button,
    Text,
    Stack,
    useClipboard,
    Divider,
} from '@chakra-ui/core';
import { FaLink, FaEyeSlash, FaTwitter, FaGlobe } from 'react-icons/fa'

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

const ShareOptions = () => {
    const [snippetPublicLink, setSnippetPublicLink] = useState("https://codelify.dev/snippets/hddeiHD739!hfii6gsU4");
    const [isPublic, setIsPublic] = useState(false)
    const { onCopy, hasCopied } = useClipboard("https://codelify.dev/snippets/hddeiHD739!hfii6gsU4");
    const toggleVisibility = () => {
        setIsPublic(!isPublic)
    }
    
    return(
        <>
        <Divider p="20px" />
        <Stack py="10px" alignItems="center" justifyContent="flex-start" isInline>
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
        <Stack py="10px" alignItems="center" justifyContent="flex-start" isInline>
            <Badge style={{cursor:"pointer"}} onClick={toggleVisibility} variantColor={isPublic ? "green" : "red"}>{isPublic ? <Public /> : <Private />}</Badge>
        </Stack>
        </>
    )
}

export default ShareOptions;