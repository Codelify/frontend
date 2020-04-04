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
        navigate(`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.avatar,identity.team&client_id=${config.slack.clientId}&team=${config.slack.teamId}`)
    }
    return (
        <Tooltip py="5px" fontSize="xs" hasArrow label="Team access" placement="bottom">
            <Button 
            size="md" 
            color="#319795"
            leftIcon={FaSlack}
            onClick={handleRedirect}
            _focus={{ outline: "none" }}
            >
                Slack Login
            </Button>
        </Tooltip>
    );
}

export default SlackLogin;

