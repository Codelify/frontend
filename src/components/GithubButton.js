import React, { useState } from 'react';
import {
  Button,
} from '@chakra-ui/core'
import { FaGithub } from 'react-icons/fa'


const GithubButton = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const onLogin = () => {
    setIsDisabled(true)
  }

  return (
    <Button
    _focus={{ outline: "none" }}
    variantColor="teal"
    variant="solid"
    size="md"
    onClick={onLogin}
    disabled={isDisabled}
    leftIcon={FaGithub}
  >
    Github Login
  </Button>    
  )
}

export default GithubButton;