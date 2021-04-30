import { useQuery } from '@apollo/client'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { Redirect, Route, Switch } from 'react-router-native'
import { SIGNED_IN_USER } from '../graphql/queries'
import useSignOut from '../hooks/useSignOut'
import theme from '../theme'
import AppBar from './AppBar'
import AppBarTab from './AppBarTab'
import AppBarTabNormal from './AppBarTabNormal'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  }
})

const Main = () => {
  const signedInUser = useQuery(SIGNED_IN_USER)

  const [ handleSignOut ] = useSignOut()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        barStyle='light-content'
        backgroundColor={theme.colors.appBarColor}
      />
      <AppBar>
        <AppBarTab title='Repositories' to='/' />
        {signedInUser.data && (
          signedInUser.data.authorizedUser
            ? <AppBarTabNormal title='Sign Out' onClick={handleSignOut}/>
            : <AppBarTab title='Sign In' to='/login' />
        )}
      </AppBar>
      <View style={styles.container}>
        <Switch>
          <Route path='/' exact>
            <RepositoryList />
          </Route>
          <Route path='/login'>
            <SignIn />
          </Route>
        </Switch>
      </View>
    </SafeAreaView>
  )
}

export default Main