import React from 'react'
import { render } from '@testing-library/react-native'
import { RepositoryListContainer } from '../../components/RepositoryList'
import { shortenMetric } from '../../components/RepositoryItem'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      // Add your test code here
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      )

      const renderedNames = getAllByTestId('fullName')
      const renderedDescriptions = getAllByTestId('description')
      const renderedLanguage = getAllByTestId('language')
      const renderedForks = getAllByTestId('forksCount')
      const renderedStars = getAllByTestId('stargazersCount')
      const renderedRatings = getAllByTestId('ratingAverage')
      const renderedReviews = getAllByTestId('reviewCount')

      const infoInOrder = repositories.edges.map(
        edge => {
          return {
            fullName: edge.node.fullName,
            description: edge.node.description,
            language: edge.node.language,
            forksCount: edge.node.forksCount,
            stargazersCount: edge.node.stargazersCount,
            ratingAverage: edge.node.ratingAverage,
            reviewCount: edge.node.reviewCount
          }
        }
      )

      for (let i = 0; i < infoInOrder.length; i++) {
        expect(renderedNames[i]).toHaveTextContent(
          infoInOrder[i].fullName
        )
        expect(renderedDescriptions[i]).toHaveTextContent(
          infoInOrder[i].description
        )
        expect(renderedLanguage[i]).toHaveTextContent(
          infoInOrder[i].language
        )
        expect(renderedForks[i]).toHaveTextContent(
          shortenMetric(infoInOrder[i].forksCount)
        )
        expect(renderedStars[i]).toHaveTextContent(
          shortenMetric(infoInOrder[i].stargazersCount)
        )
        expect(renderedRatings[i]).toHaveTextContent(
          shortenMetric(infoInOrder[i].ratingAverage)
        )
        expect(renderedReviews[i]).toHaveTextContent(
          shortenMetric(infoInOrder[i].reviewCount)
        )
      }
    })
  })
})