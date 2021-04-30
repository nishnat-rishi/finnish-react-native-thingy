import { Formik } from 'formik'
import React from 'react'
import { Pressable, View } from 'react-native'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'

import * as yup from 'yup'

import Text from './Text'
import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router'

const SignIn = () => {
  const [ signIn ] = useSignIn()

  const history = useHistory()

  const onSubmit = async values => {
    const { username, password } = values

    try {
      if (await signIn({ username, password })) {
        history.push('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

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
      return <View style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
      }}>
        <FormikTextInput
          name='username'
          placeholder='Username'
        />
        <FormikTextInput
          name='password'
          placeholder='Password'
          secureTextEntry
        />
        <Pressable onPress={handleSubmit}>
          <View style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 3,
            marginVertical: 10,
          }}>
            <Text
              fontWeight='bold'
              style={{
                color: 'white',
                alignSelf: 'center',
                paddingHorizontal: 10,
                paddingVertical: 15
              }}
            >
              Sign In
            </Text>
          </View>
        </Pressable>
      </View>
    }}
  </Formik>
}

export default SignIn