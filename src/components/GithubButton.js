import React, { useState} from 'react';
import {
  Button,
} from '@chakra-ui/core'
import { FaGithub } from 'react-icons/fa'
import GitHubLogin from 'react-github-login';
import axios from 'axios';
import config from '../utils/config'
import useOAUth from '../utils/OAuth'
const GithubButton = (props) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [login] = useOAUth()
  const onLogin = () => {
    setIsDisabled(true)
  }
  const onSuccessGithub = async (code) => {
    const { clientId, clientSecret } = config.github;
    if (code) {
      const { data: { access_token = ''}} = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code.code}`,
        {},
        {
          headers: { 'Accept': 'application/json'}
        }
      );
      if (access_token) {
        const response = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://api.github.com/user', 
          {
            headers: { 'Accept': 'application/json', 'Authorization': `token ${access_token}`}
          }
        );
        
        if (response.status === 200) {
          console.log('Via Button')
          const { login: username, name: firstName, bio, email, avatar_url: avatar, node_id: password } = response.data
           await login({
             firstName,
             email: email ? email : `${username}@gmail.com`,
             bio,
             avatar,
             password
           })
        }
      }
    }
  } 
  
  return (
    <GitHubLogin
    _focus={{ outline: "none" }}
    variantColor="teal"
    variant="solid"
    size="md"
    onClick={onLogin}
    disabled={isDisabled}
    leftIcon={FaGithub}
    onSuccess={onSuccessGithub}
    buttonText="Github Login"
    className="git-login"
    valid={true}
    redirectUri=""
    clientId={config.github.clientId}
  /> 
  )
}

export default GithubButton;