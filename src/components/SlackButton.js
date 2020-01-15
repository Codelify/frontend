import React from 'react';
import config from '../utils/config'

export default function SlackButton(props) {
  return (
    <a
      href={`https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.avatar&client_id=${config.slack.clientId}&team_id=${config.slack.teamId}`}
    >
      <img src="https://api.slack.com/img/sign_in_with_slack.png" />
    </a>
  );
}
