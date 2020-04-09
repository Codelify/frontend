import React from "react";
import { 
  Box, 
} from "@chakra-ui/core";
import SideNavContent from "./SideNavContent"


const SideNav = props => {
  return (
    <Box mr="20px" display={['none', null, 'block']}>
      <SideNavContent pos="fixed"/>
    </Box>
  );
};

export default SideNav;