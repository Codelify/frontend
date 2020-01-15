import gql from 'graphql-tag';

export const CREATE_SNIPPET = gql`
  mutation snippet($input: SnippetInput!, $token: String!) {
    createSnippet(input: $input, token: $token) {
      id
      uid
      content
      sourceUrl
      description
    }
  }
`;

export const DELETE_SNIPPET = gql`
  mutation deleteSnippet($token: String!, $snippetId: Int!) {
    deleteSnippet(token: $token, snippetId: $snippetId) {
      status
      message
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  mutation authWithGoogle($input: RegisterInput!) {
    authWithGoogle(input: $input) {
      email
      token
      firstName
      lastName
      avatar
    }
  }
`;
