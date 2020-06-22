import React, { useEffect } from "react";
import {
  Flex,
  Heading
} from "@chakra-ui/core";
import { PageView } from "../../utils/tracking";
import MainLayout from "../../layouts/AppLayout";
import LoginForm from './LoginForm'

const Login = () => {

  useEffect(() => {
    PageView();
  }, []);

  return (
    <MainLayout>
      <Heading mt="50px" as="h3" size="lg">
        Please login to enable this action
      </Heading>
        <LoginForm />
      <Flex mt="20px" justify="flex-end"></Flex>
    </MainLayout>
  );
};

export default Login;
