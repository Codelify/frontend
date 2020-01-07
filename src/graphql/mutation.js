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
