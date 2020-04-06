import React, { useState } from 'react';
import {
  Button,
} from '@chakra-ui/core'
import { FaGithub } from 'react-icons/fa'
import GitHubLogin from 'react-github-login';
import axios from 'axios';
import config from '../utils/config'
import useOAUth from '../hooks/useOAuth'
const GithubButton = () => {
  const [ loading, setLoading ] = useState(false);
  const [login] = useOAUth()
  const onSuccessGithub = async (code) => {
    setLoading(true)
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
          const { login: username, name: firstName, bio, email, avatar_url: avatar, node_id: password } = response.data
           const name = firstName ? firstName : username
           const [ fname, lname ] = name.split(' ')
            await login({
              firstName: fname,
              lastName: lname,
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
    <Button 
    _focus={{ outline: "none" }}
    variantColor="teal"
    size="md"
    leftIcon={FaGithub}
    loading={loading}
    >
    <GitHubLogin
      onSuccess={onSuccessGithub}
      valid={true}
      redirectUri=""
      clientId={config.github.clientId}
      buttonText="GitHub Login"
      className="git-button"
    />
    </Button>

  )
}
export default GithubButton;