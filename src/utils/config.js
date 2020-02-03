export default {
  slack: {
    clientId: process.env.REACT_APP_SLACK_CLIENT_ID,
    secret: process.env.REACT_APP_SLACK_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_SLACK_REDIRECT_URI,
    teamId: process.env.REACT_APP_SLACK_TEAM_ID
  },
  mailchimp: {
    apiKey: process.env.REACT_APP_MAILCHIMP_API_KEY,
    audienceId: process.env.REACT_APP_MAILCHIMP_AUDIENCE_ID
  },
  mooSend: {
    apiKey: process.env.REACT_APP_MOOSEND_API_KEY,
    listId: process.env.REACT_APP_MOOSEND_LIST_ID
  },
  googleAnalitycs: {
    apiKey: process.env.REACT_APP_GOOGLE_ANALITYCS
  },
  backend: {
    uri: process.env.REACT_APP_BE_URI
  }
};
