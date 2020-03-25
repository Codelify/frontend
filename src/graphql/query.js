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
      lang
      createdAt
      isFav
      archivedAt
      isPublic
      shareId
    }
  }
`;

export const GET_SNIPPET = gql`
  query Snippets($snippetId: String!) {
    getSnippetDetails(snippetId: $snippetId) {
      id
      title
      description
      content
      tags
      sourceUrl
      owner { 
        id
        uid
        avatar
        lastName
        firstName
        email
        bio
        twitter
        linkedin        
      }
      createdAt
      isFav
      shareId
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
      bio
      twitter
      linkedin
      snippets {
        id
        title
      }
    }
  }
`;
