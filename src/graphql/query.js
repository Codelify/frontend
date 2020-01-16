import gql from 'graphql-tag';

export const MY_SNIPPETs = gql`
  query Snippets($token: String!) {
    getAuthUserSnippets(token: $token) {
      id
      title
      description
      content
      tags
      sourceUrl
      createdAt
    }
  }
`;


