import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarColor,
    display: 'flex',
    flexDirection: 'row',
  },
  // ...
})

const AppBar = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        {children}
      </ScrollView>
    </View>
  )

}

export default AppBar