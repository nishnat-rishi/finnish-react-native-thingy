import { Formik } from 'formik'
import React from 'react'
import { View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import Button from './Button'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useHistory } from 'react-router'
import themeStyles from '../themeStyles'

const ReviewForm = () => {

  const [ createReview ] = useMutation(CREATE_REVIEW)

  const history = useHistory()

  const onSubmit = async values => {
    try {
      values.rating = Number(values.rating)
      const { data } = await createReview({ variables: { review: values } })
      history.push(`repositories/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }

  return <Formik
    initialValues={{
      repositoryName: '',
      ownerName: '',
      rating: '',
      text: '',
    }}
    validationSchema={yup.object().shape({
      repositoryName: yup.string().required('Repository\'s name is required.'),
      ownerName: yup.string().required('Owner\'s name is required.'),
      rating: yup.number()
        .required('A rating between 1-100 is required.')
        .min(0, 'Rating should be between 0 and 100')
        .max(100, 'Rating should be between 0 and 100'),
      review: yup.string()
    })}
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => {
      return <View style={themeStyles.baseView}>
        <FormikTextInput
          name='repositoryName'
          placeholder={'Repository name'}
        />
        <FormikTextInput
          name='ownerName'
          placeholder={'Repository\'s owner\'s name'}
        />
        <FormikTextInput
          name='rating'
          placeholder={'Rating'}
        />
        <FormikTextInput
          name='text'
          placeholder={'Review'}
          multiline
        />
        <Button
          primary
          onPress={handleSubmit}
          label='Submit Review'
        />
      </View>
    }}
  </Formik>
}

export default ReviewForm