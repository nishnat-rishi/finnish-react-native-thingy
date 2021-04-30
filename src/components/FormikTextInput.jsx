import React from 'react'
import { useField } from 'formik'
import { StyleSheet } from 'react-native'

import Text from './Text'
import TextInput from './TextInput'
import theme from '../theme'

const styles = StyleSheet.create({
  inputBox: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 3,
  },
  inputBoxError: {
    borderColor: theme.colors.error
  },
  errorText: {
    marginTop: 5,
    color: theme.colors.error
  }
})

const FormikTextInput = ({ name, ...props }) => {
  const [ field, meta, helpers ] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        placeholderTextColor='lightgrey'
        style={[ styles.inputBox, showError && styles.inputBoxError ]}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput