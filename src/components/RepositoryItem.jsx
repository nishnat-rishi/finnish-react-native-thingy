import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import theme from '../theme'
import Text from './Text'

const repositoryItemStyles = StyleSheet.create({
  titleMargins: {
    marginVertical: 3
  },
  verticalMargins: {
    marginVertical: 7
  },
  invisibleBox: {
    height: 10
  }
})

const shortenMetric = metric => {
  if (metric > 1000) {
    return `${(metric / 1000).toFixed(1)}k`
  } else {
    return `${metric}`
  }
}

const NumericDetailView = ({ metric, title }) => {

  return <View style={{
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

const RepositoryItem = ({ item }) => {

  return <View style={{
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: 'white',
    paddingVertical: 10
  }}>
    <View style={[ // image + title row
      {
        display: 'flex',
        flexDirection: 'row',
      },
      repositoryItemStyles.verticalMargins
    ]}>
      <View style={{ // image box
        flex: 1,
      }}>
        <Image style={{
          height: 50,
          width: 50,
          borderRadius: 3,
          alignSelf: 'center'
        }} source={{ uri: item.ownerAvatarUrl }} />
      </View>
      <View style={{ // title + description box
        flex: 4,
      }}>
        <Text fontWeight='bold' style={[
          repositoryItemStyles.titleMargins
        ]}>
          {item.fullName}
        </Text>
        <Text color='textSecondary' style={[
          repositoryItemStyles.titleMargins
        ]}>
          {item.description}
        </Text>
      </View>
    </View>
    <View style={[ // language tag row
      {
        display: 'flex',
        flexDirection: 'row',
      },
      repositoryItemStyles.verticalMargins
    ]}>
      <View style={{ // empty box
        flex: 1
      }} />
      <View style={{ // language tag box
        display: 'flex',
        flexDirection: 'row',
        flex: 4,
      }}>
        <Text style={[ { // language tag
          padding: 5,
          color: 'white',
          backgroundColor: theme.colors.primary,
          borderRadius: 3
        },
        ]}>
          {item.language}
        </Text>
      </View>
    </View>
    <View style={[ // divider row
      {
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 3,
        marginHorizontal: 10,
        marginVertical: 10
      }
    ]}></View>
    <View style={[ // stars, forks, reviews, rating row
      {
        display: 'flex',
        flexDirection: 'row',
      },
      repositoryItemStyles.verticalMargins
    ]}>
      <NumericDetailView
        metric={item.stargazersCount}
        title='Stars'
      />
      <NumericDetailView
        metric={item.forksCount}
        title='Forks'
      />
      <NumericDetailView
        metric={item.reviewCount}
        title='Reviews'
      />
      <NumericDetailView
        metric={item.ratingAverage}
        title='Rating'
      />
    </View>
  </View>
}

export default RepositoryItem