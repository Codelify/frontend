import React from "react";
import { 
  Box, 
} from "@chakra-ui/core";
import SideNavContent from "./SideNavContent"

const SideNavContainer = props => (
  <Box
    maxWidth="350px" 
    height="100%"
    top="0"
    right="0"
    {...props}
  />
);

const SideNav = props => {
  return (
    <SideNavContainer {...props}>
      <SideNavContent />
    </SideNavContainer>
  );
};

export default SideNav;