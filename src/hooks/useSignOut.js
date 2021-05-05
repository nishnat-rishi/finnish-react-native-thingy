import { useApolloClient, useQuery } from '@apollo/client'
import { useHistory } from 'react-router'
import { SIGNED_IN_USER } from '../graphql/queries'
import useAuthStorage from './useAuthStorage'

const useSignOut = () => {
  const { data, loading } = useQuery(SIGNED_IN_USER)
  const history = useHistory()

  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    history.push('/login')
    return true
  }

  return [ signOut, { data, loading } ]
}

export default useSignOut