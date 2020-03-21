import gql from "graphql-tag";

export const CREATE_SNIPPET = gql`
  mutation snippet($input: SnippetInput!, $token: String!) {
    createSnippet(input: $input, token: $token) {
      id
      title
      tags
      uid
      content
      sourceUrl
      description
    }
  }
`;

export const DELETE_SNIPPET = gql`
  mutation deleteSnippet($token: String!, $snippetId: Int!, $archive: Boolean) {
    deleteSnippet(token: $token, snippetId: $snippetId, archive: $archive) {
      status
      message
    }
  }
`;

export const UPDATE_SNIPPET = gql`
  mutation UpdateSnippet(
    $snippetId: Int!
    $snippetInfo: SnippetInput!
    $token: String!
  ) {
    updateSnippet(input: $snippetInfo, snippetId: $snippetId, token: $token) {
      id
      title
      description
      content
      tags
      isFav
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($token: String!, $profileInfo: ProfileInput!) {
    updateProfile(input: $profileInfo, token: $token) {
      id
      email
      bio
      twitter
      linkedin
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
