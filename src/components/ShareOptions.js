import React from 'react'
import {
    Box,
    Button,
    Text,
    Stack,
    useClipboard,
} from '@chakra-ui/core';
import { FaLink } from 'react-icons/fa'

const ShareOptions = () => {
    const [snippetPublicLink, setSnippetPublicLink] = React.useState("https://codelify.dev/snippets/hddeiHD739!hfii6gsU4");
    const { onCopy, hasCopied } = useClipboard(snippetPublicLink);

    return(
        <Stack py="10px" my="20px" borderWidth="1px" alignItems="center" justifyContent="flex-start" isInline>
            <Box mx="5px" as={FaLink} />
            <Text fontSize="sm">{snippetPublicLink}</Text>
            <Button onClick={onCopy} variantColor="teal" size="xs" _focus={{ outline: "none" }}>
                {hasCopied ? "Copied" : "Copy"}
            </Button>
        </Stack>
    )
}

export default ShareOptions;