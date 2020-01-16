import React from 'react';
import config from '../utils/config'
import { navigate } from "@reach/router";

import {
    Button,
} from '@chakra-ui/core'

import { FaSlack } from 'react-icons/fa'


const SlackLogin = () => {

    const handleRedirect = () => {
       navigate(`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.avatar&client_id=${config.slack.clientId}&team_id=${config.slack.teamId}`)
    }
    return (
        <Button 
        size="md" 
        variantColor="teal"
        leftIcon={props => <FaSlack size="1.2em" {...props} />}
        onClick={handleRedirect}
        >
            Lambda Slack Login
        </Button>
    );
}

export default SlackLogin;

