import { StyleSheet } from 'react-native'
import theme from './theme'

const themeStyles = StyleSheet.create({
  baseView: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  repositoryItemView: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    backgroundColor: 'white',
    paddingVertical: 10
  },
  primaryButton: {
    padding: 5,
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: 3
  },
  listSeparator: {
    height: 10,
  }
})

export default themeStyles