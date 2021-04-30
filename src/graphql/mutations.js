import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation authorize ($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`