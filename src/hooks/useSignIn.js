import { useApolloClient, useMutation } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const [ authorize, result ] = useMutation(SIGN_IN)

  const authStorage = useAuthStorage()

  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    const { data } = await authorize({ variables: { credentials: { username, password } } })
    await authStorage.setAccessToken(data.authorize.accessToken)
    await apolloClient.resetStore()
    return true
  }

  return [ signIn, result ]
}

export default useSignIn