import React from "react";
import { Image, Box } from "@chakra-ui/core";

const Logo = props => {
  return (
    <Box>
      <Image width={["100px", "120px", "120px", "120px"]} height="auto" src="https://res.cloudinary.com/codelify/image/upload/f_auto,q_auto/v1583158030/logo-green-grad_b5mjgi.svg" alt="Codelify Logo" />
    </Box>
  );
};

export default Logo;
