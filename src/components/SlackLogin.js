import React from 'react';

import {
    Button,
} from '@chakra-ui/core'

import { FaSlack } from 'react-icons/fa'


const SlackLogin = () => {
    return (
        <Button 
        size="md" 
        variantColor="teal"
        leftIcon={props => <FaSlack size="1.2em" {...props} />}
        >
            Login whith Slack
        </Button>
    );
}

export default SlackLogin;