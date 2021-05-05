import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    language
    forksCount
    ratingAverage
    stargazersCount
    reviewCount
    url
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`