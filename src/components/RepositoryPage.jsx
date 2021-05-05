import React from 'react'
import { FlatList, Pressable, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'

import { GET_REPOSITORY_DETAILS } from '../graphql/queries'

import Text from './Text'
import {
  ContentDivider,
  ItemContentContainer,
  ItemTitleContainer,
  RepositoryItemContents
} from './RepositoryItem'

import themeStyles from '../themeStyles'
import theme from '../theme'
import ItemSeparator from './ItemSeparator'
import { format } from 'date-fns'

const RepositoryPageHeader = ({ item }) => {
  return <View style={[
    themeStyles.repositoryItemView,
    {
      marginBottom: 10
    }
  ]}>
    <RepositoryItemContents item={item} />
    <Pressable
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 3,
        backgroundColor: theme.colors.primary,
      }}
      onPress={() => {
        WebBrowser.openBrowserAsync(item.url)
      }}>
      <Text style={{
        alignSelf: 'center',
        color: 'white',
        paddingVertical: 10
      }}>
        Open on GitHub
      </Text>
    </Pressable>
  </View>
}

const Review = ({ review }) => {

  const ReviewRating = () => {
    return <View style={{ // rating circle
      borderWidth: 2,
      width: 40,
      height: 40,
      paddingVertical: 9,
      flex: 1,
      alignSelf: 'center',
      borderColor: theme.colors.primary,
      borderRadius: 20
    }}>
      <Text // rating number
        color='primary'
        fontWeight='bold'
        style={{
          flex: 1,
          alignSelf: 'center',
        }}
      >
        {review.rating}
      </Text>
    </View>
  }

  const ReviewText = () => {
    return <Text style={{
      paddingRight: 10
    }}>
      {review.text}
    </Text>
  }

  return <View style={[ themeStyles.repositoryItemView ]}>
    <ItemTitleContainer
      IconComponent={ReviewRating}
      title={review.user.username}
      subtitle={format(new Date(review.createdAt), 'dd.MM.yyyy')}
    />
    <ItemContentContainer
      Content={ReviewText}
      style={{
        marginTop: 0,
        margin10: 10
      }}
    />
  </View>
}

const RepositoryPage = () => {

  const { id } = useParams()

  const { data, loading } = useQuery(GET_REPOSITORY_DETAILS, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) {
    return <View>
      <Text>Loading...</Text>
    </View>
  }

  const reviews = data.repository.reviews.edges.map(edge => edge.node)

  return <FlatList
    data={reviews}
    renderItem={({ item }) => <Review review={item} />}
    ListHeaderComponent={<RepositoryPageHeader item={data.repository} />}
    ItemSeparatorComponent={ItemSeparator}
  />
}

export default RepositoryPage