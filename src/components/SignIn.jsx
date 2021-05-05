import { Formik } from 'formik'
import React from 'react'
import FormikTextInput from './FormikTextInput'

import * as yup from 'yup'

import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router'
import Button from './Button'
import { View } from 'react-native'
import themeStyles from '../themeStyles'

export const SignInContainer = ({ onSubmit }) => {
  return <Formik
    initialValues={{
      username: '',
      password: ''
    }}
    validationSchema={yup.object().shape({
      username: yup.string().required('Username is required.'),
      password: yup.string().required('Password is required.')
    })}
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => {
      return <View style={themeStyles.baseView}>
        <FormikTextInput
          testID='usernameField'
          name='username'
          placeholder='Username'
        />
        <FormikTextInput
          testID='passwordField'
          name='password'
          placeholder='Password'
          secureTextEntry
        />
        <Button
          primary
          testID='submitButton'
          onPress={handleSubmit}
          label='Sign In'
        />
      </View>
    }}
  </Formik>
}

const SignIn = () => {
  const [ signIn ] = useSignIn()

  const history = useHistory()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      if (await signIn({ username, password })) {
        history.push('/repositories')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn