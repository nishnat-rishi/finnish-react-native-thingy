import { useQuery } from '@apollo/client'
import { ALL_REPOSITORIES } from '../graphql/queries'

// fetch
// const useRepositories = () => {
//   const [ repositories, setRepositories ] = useState()
//   const [ loading, setLoading ] = useState(false)

//   const fetchRepositories = async () => {
//     setLoading(true)

//     const response = await fetch(Constants.manifest.extra.fetchUri)
//     const json = await response.json()

//     setLoading(false)
//     setRepositories(json)
//   }

//   useEffect(() => {
//     fetchRepositories()
//   }, [])

//   return { repositories, loading, refetch: fetchRepositories }
// }


// GraphQL
const useRepositories = (variables) => {
  const { loading, refetch, fetchMore, data, networkStatus } = useQuery(
    ALL_REPOSITORIES,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    },
  )

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    console.log(canFetchMore, loading, data?.repositories.pageInfo.hasNextPage)

    if (!canFetchMore) {
      return
    }

    console.log('fetching more...')
    const f = await fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },

    })
    console.log('f:', f)
    console.log('repositories:', data.repositories)
  }

  return {
    repositories: data?.repositories,
    refetch,
    fetchMore: handleFetchMore,
    loading,
    networkStatus
  }
}

export default useRepositories