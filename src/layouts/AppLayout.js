import { Box, useColorMode, Flex } from "@chakra-ui/core";
import React from "react";
import Header from "../components/Header/Header";
import SideNav from "../components/SideNav";
import Footer from "../components/Elements/Footer";
import Container from "../components/Elements/Container";

const Main = props => <Box as="main" mb="3rem" {...props} />;

const MainLayout = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Container>
        <Header appView={true}/>
      </Container>
      <Flex align="center" justify="center" w="100%">
        <Container d="flex">
          <SideNav />
          <Main ml={["0px", "0px", "210px", "210px"]} px="10px" w="100%" pt={8}>
          <Box
            px={["10px", "10px", "10px", "20px"]}
            borderRadius="10px"
            backgroundColor={
              colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"
            }
            mt={["120px", "50px", "50px", "50px"]}
            py={["20px", "40px", "40px", "40px"]}
          >            
            {children}
          </Box>
          </Main>
        </Container>
      </Flex>
      <Footer />
    </Box>
  );
};

export default MainLayout;
