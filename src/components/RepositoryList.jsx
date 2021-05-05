import React, { useState } from 'react'
import { FlatList, View, Pressable, Modal, TextInput } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import ItemSeparator from './ItemSeparator'
import RepositoryItem, { ContentDividerNormal } from './RepositoryItem'
import { Ionicons } from '@expo/vector-icons'
import Text from './Text'
import { useDebouncedCallback } from 'use-debounce/lib'

const ModalItem = ({ item, onFilterSelect, label, ...props }) => {
  return <Pressable
    onPress={onFilterSelect(item)}
    style={{
      padding: 10,
    }}
    {...props}
  >
    <Text>{label[item]}</Text>
  </Pressable>
}

const RepositoryFilter = ({ setVariables }) => {
  const [ filter, setFilter ] = useState('latest')
  const [ modalVisible, showModal ] = useState(false)

  const label = {
    'latest': 'Latest Repositories',
    'rating_asc': 'Rating (Increasing)',
    'rating_desc': 'Rating (Descending)'
  }

  const queryVariables = {
    'latest': {
      orderBy: 'CREATED_AT',
      orderDirection: 'ASC'
    },
    'rating_asc': {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC'
    },
    'rating_desc': {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC'
    }
  }

  const onFilterSelect = filterType => async () => {
    setFilter(filterType)
    setVariables(queryVariables[filterType])
    showModal(false)
  }

  return <>
    <View style={{
      paddingBottom: 10
    }}>
      <Pressable
        onPress={() => showModal(true)}
        style={{
          height: 40,
          flexGrow: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Text style={{
          paddingHorizontal: 10,
        }}>
        Filter by:{' '}
          <Text style={{
            fontStyle: 'italic'
          }}>
            {label[filter]}
          </Text>
        </Text>
        <View style={{
          paddingHorizontal: 20
        }}>
          <Ionicons color='grey' name='caret-down'/>
        </View>
      </Pressable>
    </View>
    <View style={[ {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } ]}>
      <Modal
        transparent
        visible={modalVisible}
        animationType='fade'
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 3,
            alignItems: 'flex-start',
            width: 300,
          }}
          >
            <View style={{
              width: 300,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text
                color='textSecondary'
                style={{
                  paddingTop: 5,
                  paddingHorizontal: 10,
                  alignSelf: 'flex-start'
                }}
              >
                Select a filter...
              </Text>
              <Pressable
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingTop: 7,
                  paddingBottom: 3
                }}
                onPress={() => showModal(false)}
              >
                <Ionicons name='close' />
              </Pressable>
            </View>
            <FlatList
              style={{
                width: 300,
                flexGrow: 0,
                marginBottom: 10,
              }}
              renderItem={({ item }) =>
                <ModalItem
                  item={item}
                  onFilterSelect={onFilterSelect}
                  label={label}
                />}
              data={Object.keys(label)}
              keyExtractor={item => item}
              ItemSeparatorComponent={ContentDividerNormal}
            />
          </View>
        </View>
      </Modal>
    </View>
  </>
}

const SearchBar = ({ searchCallback }) => {

  const [ term, setTermRaw ] = useState('')

  const setTerm = value => {
    setTermRaw(value)
    searchCallback(value)
  }

  return <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 3,
    borderColor: 'lightgrey',
    alignItems: 'center'
  }}>
    <View style={{
      paddingHorizontal: 20
    }}>
      <Ionicons
        style={{
          alignSelf: 'flex-start'
        }}
        size={24}
        name='search'
      />
    </View>
    <TextInput style={{
      padding: 10,
      alignSelf: 'stretch',
      flexGrow: 1,
    }}
    placeholder='Search'
    placeholderTextColor='lightgrey'
    value={term}
    onChangeText={setTerm}
    />
    <Pressable
      style={{
        paddingHorizontal: 20,
      }}
      onPress={() => setTerm('')}>
      <Ionicons
        style={{
          alignSelf: 'flex-end'
        }}
        size={24}
        name='close'
      />
    </Pressable>
  </View>
}

export const RepositoryListContainer = ({
  repositories, setVariables, onEndReach
}) => {

  const debouncedSearch = useDebouncedCallback(
    text => {
      setVariables({ searchKeyword: text })
    }, 1000
  )

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return <>
    <SearchBar searchCallback={debouncedSearch}/>
    <FlatList
      ListHeaderComponent={<RepositoryFilter {...{ setVariables }} />}
      renderItem={({ item }) => <RepositoryItem item={item}/>}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  </>
}

const RepositoryList = () => {
  const [ variables, setVariables ] = useState({
    first: 8
  })
  const { repositories, fetchMore } = useRepositories(variables)

  const onEndReach = () => {
    fetchMore() // THIS IS BULLSHIT. WHERE IS MY RELAY STYLE PAGINATION???
  }

  return <RepositoryListContainer {...{
    repositories,
    setVariables,
    onEndReach
  }} />
}

export default RepositoryList