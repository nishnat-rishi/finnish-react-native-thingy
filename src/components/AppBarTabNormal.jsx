import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'

const appBarTabStyles = StyleSheet.create({
  tab: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
  },
  text: {
    alignSelf: 'center',
    color: 'white'
  }
})

const AppBarTabNormal = ({ title, onClick }) => {
  return <Pressable onPress={onClick} style={[ appBarTabStyles.tab ]}>
    <View style={{
      display: 'flex',
      alignSelf: 'center',
      flexGrow: 1,
      marginHorizontal: 30,
    }}>
      <Text
        fontWeight='bold'
        style={[ appBarTabStyles.text ]}
      >
        {title}
      </Text>
    </View>
  </Pressable>
}

export default AppBarTabNormal