import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import config from '../utils/config';
import { useMutation } from '@apollo/react-hooks';
import { useToast } from '@chakra-ui/core';
import { navigate } from "@reach/router";
import { LOGIN_WITH_GOOGLE, CREATE_SNIPPET } from '../graphql/mutation';
import Spinner from '../components/~common/Spinner'

export default function SlackAuthenticator(props) {
  const [loginWithSlack] = useMutation(LOGIN_WITH_GOOGLE);
  const [createSnippet] = useMutation(CREATE_SNIPPET);
  const toasting = useToast();

  const login = async user => {
    try {
      const { data, error } = await loginWithSlack({
        variables: {
          input: {
            firstName: user.name,
            email: user.email,
            password: user.id,
            avatar: user.image_72,
          },
        },
      });
      if (data) {
        localStorage.setItem('token', data.authWithGoogle.token);
        if (localStorage.getItem('snippetData')) {
          const snippetData = {
            ...JSON.parse(
              typeof window !== 'undefined' &&
                window.localStorage.getItem('snippetData'),
            ),
            token: data.authWithGoogle.token,
          };
          const { data: res, error } = await createSnippet({
            variables: snippetData,
          });
          if (res) {
            typeof window !== 'undefined' &&
              window.localStorage.removeItem('snippetData');
            toasting({
              position: 'top-right',
              title: 'Yooohooo ! 🍹',
              description: 'Your snippet has been saved',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
          if (error) {
            toasting({
              position: 'top-right',
              title: 'An error occurred.',
              description: 'Unable to create this snippet.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        }
           navigate("/app");
      }
         navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const authenticate = async () => {
      const { code = '' } = queryString.parse(props.location.search);
      console.log('code', code)
      if (code) {
        const {
          data: { user, ...rest },
        } = await axios.get(
          `https://slack.com/api/oauth.access?client_id=${config.slack.clientId}&client_secret=${config.slack.secret}&code=${code}`,
        );
        console.log('rest', rest)
        if (user) {
          await login(user);
        }
      }
    };

    authenticate();
  }, []);

  return (
    <div>
       <Spinner />
    </div>
  );
}