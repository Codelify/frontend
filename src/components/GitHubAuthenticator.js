import React, { useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import config from '../utils/config';
import Spinner from '../components/~common/Spinner';
import { Box } from '@chakra-ui/core';
import useOAuth from '../hooks/useOAuth'
import { PageView } from './~common/Tracking';

export default function GitHubAuthenticator(props) {
  
  const [login] = useOAuth()

  useEffect(() => {
    PageView();
    const authenticate = async () => {
      const { code = '' } = queryString.parse(props.location.search);
      console.log('Via Authenticator');
      const { clientId, clientSecret } = config.github;
      if (code) {
        if (code) {
            const { data: { access_token = ''}} = await axios.post(
              `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
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
    };
    authenticate();
  }, [props.location.search, login]);

  return (
    <Box mt="250px">
      <Spinner />
    </Box>
  );
}
