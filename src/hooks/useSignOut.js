import { useApolloClient, useQuery } from '@apollo/client'
import { SIGNED_IN_USER } from '../graphql/queries'
import useAuthStorage from './useAuthStorage'

const useSignOut = () => {
  const { data, loading } = useQuery(SIGNED_IN_USER)

  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    return true
  }

  return [ signOut, { data, loading } ]
}

export default useSignOut