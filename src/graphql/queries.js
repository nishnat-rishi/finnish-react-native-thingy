import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS } from './fragments'

export const ALL_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS}

  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
`

export const SIGNED_IN_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`