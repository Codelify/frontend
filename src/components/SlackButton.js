import React from 'react';
import config from '../utils/config'
import { navigate } from "@reach/router";

import {
    Button,
    Tooltip,
} from '@chakra-ui/core'

import { FaSlack } from 'react-icons/fa'


const SlackLogin = () => {

    const handleRedirect = () => {
       navigate(`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.avatar&client_id=${config.slack.clientId}&team_id=${config.slack.teamId}`)
    }
    return (
        <Tooltip fontSize="xs" hasArrow label="Lambda School Students" placement="bottom">
            <Button 
            size="lg" 
            variantColor="teal"
            leftIcon={props => <FaSlack size="1.2em" {...props} />}
            onClick={handleRedirect}
            >
                Slack Login
            </Button>
        </Tooltip>
    );
}

export default SlackLogin;

