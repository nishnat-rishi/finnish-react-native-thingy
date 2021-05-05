import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'

import * as yup from 'yup'
import { SIGN_UP } from '../graphql/mutations'
import themeStyles from '../themeStyles'
import Button from './Button'
import FormikTextInput from './FormikTextInput'

import useSignIn from '../hooks/useSignIn'
import { useHistory } from 'react-router'

const SignUp = () => {

  const [ signUp ] = useMutation(SIGN_UP)
  const [ signIn ] = useSignIn()
  const history = useHistory()

  const onSubmit = async values => {
    try {

      await signUp({ variables: { user: {
        username: values.username,
        password: values.password
      } } })

      await signIn({
        username: values.username,
        password: values.password
      })

      history.push('/repositories')

    } catch (e) {
      console.log(e)
    }


  }

  return <Formik
    initialValues={{
      username: '',
      password: '',
      passwordConfirm: ''
    }}
    validationSchema={yup.object().shape({
      username: yup.string()
        .required('Username is required.')
        .min(1, 'Username should be 1 to 30 characters long.')
        .max(30, 'Username should be 1 to 30 characters long.')
      ,
      password: yup.string()
        .required('Password is required.')
        .min(5, 'Password should be 5 to 50 characters long.')
        .max(50, 'Password should be 5 to 50 characters long.')
      ,
      passwordConfirm: yup.string()
        .required('Password confirmation is required.')
        .oneOf([ yup.ref('password') ], 'Password confirmation should be same as password.')
      ,
    })}

    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => {
      return <View style={themeStyles.baseView}>
        <FormikTextInput
          name='username'
          placeholder='Username'
        />
        <FormikTextInput
          name='password'
          placeholder='Password'
          secureTextEntry
        />
        <FormikTextInput
          name='passwordConfirm'
          placeholder='Confirm password'
          secureTextEntry
        />
        <Button
          primary
          label='Sign Up'
          onPress={handleSubmit}
        />
      </View>
    }}
  </Formik>
}

export default SignUp