import React from "react";
import { Image, Box, Text, Stack } from "@chakra-ui/core";

const Logo = props => {
  return (
    <Box>
      <Stack isInline>
        <Box>
          <Image width={["100px", "120px", "120px", "120px"]} height="auto" src="https://res.cloudinary.com/codelify/image/upload/f_auto,q_auto/v1583158030/logo-green-grad_b5mjgi.svg" alt="Codelify Logo" />
        </Box>
        <Text color="#549595" style={{fontSize:"10px"}} >Beta</Text>
      </Stack>
    </Box>
  );
};

export default Logo;
