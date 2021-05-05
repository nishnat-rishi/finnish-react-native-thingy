import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useHistory } from 'react-router'
import themeStyles from '../themeStyles'
import Text from './Text'

const repositoryItemStyles = StyleSheet.create({
  verticalMargins: {
    marginVertical: 7
  },
  invisibleBox: {
    height: 10
  }
})

export const shortenMetric = metric => {
  if (metric > 1000) {
    return `${(metric / 1000).toFixed(1)}k`
  } else {
    return `${metric}`
  }
}

const NumericDetailView = ({ metric, title, ...props }) => {

  return <View {...props} style={{
    margin: 'auto',
    flex: 1,
  }}>
    <Text fontWeight='bold' style={{
      alignSelf: 'center'
    }}>
      {shortenMetric(metric)}
    </Text>
    <Text color='textSecondary' style={{
      alignSelf: 'center'
    }}>
      {title}
    </Text>
  </View>
}

export const ContentDividerNormal = ({ style, ...props }) => {
  return <View style={[ {
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 10,
  }, style ]} {...props}/>
}

export const ContentDivider = () => {
  return <ContentDividerNormal style={{
    marginVertical: 10
  }} />
}

export const ItemTitleContainer = ({
  title, subtitle, IconComponent, titleTestID, subtitleTestID
}) => {
  return <View style={[ // image + title row
    {
      display: 'flex',
      flexDirection: 'row',
    },
    repositoryItemStyles.verticalMargins
  ]}>
    <View style={{ // IconComponent box
      flex: 1,
      alignSelf: 'center'
    }}>
      <IconComponent />
    </View>
    <View style={{ // title + subtitle box
      flex: 4,
    }}>
      <Text testID={titleTestID} fontWeight='bold' style={[
        {
          flex: 1
        }
      ]}>
        {title}
      </Text>
      <Text testID={subtitleTestID} color='textSecondary' style={[
        {
          flex: 1
        }
      ]}>
        {subtitle}
      </Text>
    </View>
  </View>
}

export const ItemContentContainer = ({ Content, style }) => {
  return <View style={[
    {
      display: 'flex',
      flexDirection: 'row',
    },
    repositoryItemStyles.verticalMargins,
    style
  ]}>
    <View style={{ // empty box
      flex: 1
    }} />
    <View style={{ //content
      display: 'flex',
      flexDirection: 'row',
      flex: 4,
    }}>
      <Content />
    </View>
  </View>
}

export const RepositoryItemContents = ({ item }) => {

  const RepositoryAvatar = () => {
    return <Image style={{
      height: 50,
      width: 50,
      borderRadius: 3,
      alignSelf: 'center'
    }} source={{ uri: item.ownerAvatarUrl }} />
  }

  const LanguageTag = () => {
    return <Text testID='language' style={[ themeStyles.primaryButton ]}>
      {item.language}
    </Text>
  }

  return <View style={{
    marginBottom: 5
  }}>
    <ItemTitleContainer
      title={item.fullName}
      titleTestID='fullName'
      subtitle={item.description}
      subtitleTestID='description'
      IconComponent={RepositoryAvatar}
    />
    <ItemContentContainer Content={LanguageTag} />
    <ContentDivider />
    <View style={[ // stars, forks, reviews, rating row
      {
        display: 'flex',
        flexDirection: 'row',
      },
      repositoryItemStyles.verticalMargins
    ]}>
      <NumericDetailView
        testID='stargazersCount'
        metric={item.stargazersCount}
        title='Stars'
      />
      <NumericDetailView
        testID='forksCount'
        metric={item.forksCount}
        title='Forks'
      />
      <NumericDetailView
        testID='reviewCount'
        metric={item.reviewCount}
        title='Reviews'
      />
      <NumericDetailView
        testID='ratingAverage'
        metric={item.ratingAverage}
        title='Rating'
      />
    </View>
  </View>
}

const RepositoryItem = ({ item }) => {

  const history = useHistory()

  return <Pressable
    onPress={() => history.push(`/repositories/${item.id}`)}
  >
    <View style={[ themeStyles.repositoryItemViewSyle, {
      backgroundColor: 'white'
    } ]}>
      <RepositoryItemContents item={item} />
    </View>
  </Pressable>
}

export default RepositoryItem