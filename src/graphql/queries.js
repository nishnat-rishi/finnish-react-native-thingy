import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments'

export const ALL_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS}

  query repositories (
    $after: String,
    $first: Int,
    $orderDirection: OrderDirection, 
    $orderBy: AllRepositoriesOrderBy,
    $searchKeyword: String
    ) {
    repositories (
      after: $after,
      first: $first,
      orderDirection: $orderDirection,
      orderBy: $orderBy,
      searchKeyword: $searchKeyword
      ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`

export const GET_REPOSITORY_DETAILS = gql`
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}

  query getRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
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