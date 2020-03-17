import React, { useState } from 'react'
import {
    Badge,
    Box,
    Button,
    Text,
    Stack,
    useClipboard,
} from '@chakra-ui/core';
import { FaLink, FaEye, FaEyeSlash } from 'react-icons/fa'

const ShareOptions = () => {
    const [snippetPublicLink, setSnippetPublicLink] = useState("https://codelify.dev/snippets/hddeiHD739!hfii6gsU4");
    const [isPublic, setIsPublic] = useState(false)
    const { onCopy, hasCopied } = useClipboard(snippetPublicLink);
    const toggleVisibility = () => {
        setIsPublic(!isPublic)
    }

    return(
        <>
        <Stack py="10px" mt="10px" alignItems="center" justifyContent="flex-start" isInline>
            <Box mx="5px" as={FaLink} />
            <Text fontSize="sm">{snippetPublicLink}</Text>
            <Button onClick={onCopy} variantColor="teal" size="xs" _focus={{ outline: "none" }}>
                {hasCopied ? "Copied" : "Copy"}
            </Button>
        </Stack>
        <Stack py="10px" alignItems="center" justifyContent="flex-start" isInline>
            <Box mx="5px" as={isPublic ? FaEye : FaEyeSlash } />
            <Text fontSize="sm">This snippet is </Text> <Badge style={{cursor:"pointer"}} onClick={toggleVisibility} variantColor={isPublic ? "green" : "red"}>{isPublic ? "Public" : "Private"}</Badge>
        </Stack>
        </>
    )
}

export default ShareOptions;