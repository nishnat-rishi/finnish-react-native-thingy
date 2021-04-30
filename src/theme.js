import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textInverted: '#dbd6d1',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarColor: '#24292e',
    error: '#d73a4a'
  },
  borders: {
    borderRadius: 3,
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export default theme