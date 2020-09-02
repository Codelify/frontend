import React from "react";
import { Box, Flex, Stack, Skeleton, Divider } from "@chakra-ui/core";

const CodeSnippetSkeleton = () => {
  return (
      <Flex flexWrap="wrap">
        <Stack
          mr="15px"
          minWidth="310px"
          w={["100%", "100%", "100%", "35%"]}
        >
          {/* Header  */}
          <Skeleton colorStart="gray" height="20px" />
          <Divider />
          {/* Descriptiom  */}
          <Skeleton width="90%" height="4px" my="3px" />
          <Skeleton width="90%" height="4px" my="3px" />
          <Skeleton width="90%" height="4px" my="3px" />
          <Skeleton width="90%" height="4px" my="3px" />
          {/* Tags  */}
          <Stack my="20px" isInline spacing={1} >
            <Skeleton w="15%" height="10px" />
            <Skeleton w="15%" height="10px" />
            <Skeleton w="15%" height="10px" />
            <Skeleton w="15%" height="10px" />
            <Skeleton w="15%" height="10px" />
          </Stack>
          {/* Share options  */}
          <Skeleton w="50%" height="4px" my="3px" />
          <Skeleton w="50%" height="4px" my="3px" />
        </Stack>
        <Box
          minWidth="310px"
          w={["100%", "100%", "100%", "60%"]}
          borderRadius="5px"
        >
          <Box
            mb="5px"
          >
            {/* Code bar  */}
            <Skeleton colorStart="gray" height="20px" />
          </Box>
          {/* Code Snippet  */}
          <Skeleton height="200px" />
        </Box>
      </Flex>
  );
};

export default CodeSnippetSkeleton;