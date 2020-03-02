import React from "react";
import { Image, Box } from "@chakra-ui/core";
import mainLogo from "../assets/img/logo-green-grad.svg";

const Logo = props => {
  return (
    <Box>
      <Image width={["100px", "120px", "120px", "120px"]} height="auto" src={mainLogo} alt="Codelify Logo" />
    </Box>
  );
};

export default Logo;
