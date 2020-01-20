export default {
  slack: {
    clientId: process.env.REACT_APP_SLACK_CLIENT_ID,
    secret: process.env.REACT_APP_SLACK_CLIENT_SECRET,
    teamId: process.env.REACT_APP_SLACK_TEAM_ID
  },
  mailchimp:{
    apiKey: process.env.REACT_APP_MAILCHIMP_API_KEY,
    audienceId: process.env.REACT_APP_MAILCHIMP_AUDIENCE_ID,
  }
};
