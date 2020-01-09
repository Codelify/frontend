import { Box, Flex } from '@chakra-ui/core';
import React from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import Container from '../components/Container';

const Main = props => <Box as="main" mb="3rem" {...props} />;

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Container>
        <Header />
      </Container>
      <Flex align="center" justify="center" w="100%">
        <Container d="flex">
          <SideNav
            display={['none', null, 'block']}
            maxWidth="18rem"
            width="full"
          />
          <Main w="100%" pt={8}>
            {children}
          </Main>
        </Container>
      </Flex>
      <Footer />
    </Box>
  );
};

export default MainLayout;
