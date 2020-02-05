import gql from "graphql-tag";

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
      isFav
      archivedAt
    }
  }
`;

export const USER_DETAILS = gql`
  query UserDetails($token: String!) {
    getUserDetails(token: $token) {
      id
      uid
      avatar
      lastName
      firstName
      email
      snippets {
        id
        title
      }
    }
  }
`;
