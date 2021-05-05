import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation authorize ($credentials: AuthorizeInput) {
    authorize (credentials: $credentials) {
      accessToken
    }
  }
`

export const SIGN_UP = gql`
  mutation createUser ($user: CreateUserInput!) {
    createUser (user: $user) {
      username
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`