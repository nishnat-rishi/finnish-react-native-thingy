import React from 'react'
import { Pressable, View } from 'react-native'
import theme from '../theme'
import Text from './Text'

const Button = ({ label, primary, ...props }) => {
  return <Pressable {...props}>
    <View style={{
      backgroundColor: primary
        ? theme.colors.primary
        : 'lightgrey',
      borderRadius: 3,
      marginVertical: 10,
    }}>
      <Text
        fontWeight='bold'
        style={{
          color: primary
            ? 'white'
            : theme.colors.textSecondary,
          alignSelf: 'center',
          paddingHorizontal: 10,
          paddingVertical: 15
        }}
      >
        {label}
      </Text>
    </View>
  </Pressable>
}

export default Button