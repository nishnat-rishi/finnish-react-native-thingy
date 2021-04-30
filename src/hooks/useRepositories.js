import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
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
const useRepositories = () => {
  const { loading, refetch, data } = useQuery(ALL_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network'
    }
  )

  return {
    repositories: data ? data.repositories : null,
    refetch,
    loading
  }
}

export default useRepositories