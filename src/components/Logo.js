import React from "react";
import { Image, Box } from "@chakra-ui/core";
import mainLogo from "../assets/img/logo-green-grad.png";

const Logo = props => {
  return (
    <Box>
      <Image size="150px" height="auto" src={mainLogo} alt="Codelify Logo" />
    </Box>
  );
};

export default Logo;
