import { gql } from '@apollo/client'

export const fragmentClasses = gql`
  fragment Classes on Classes {
    id
    title
    rRule
    zoom
    startDate
    endDate
  }
`

export const fetchClasses = gql`
  query FetchClasses($email: String!) {
    classes(email: $email) {
      ...Classes
    }
  }
  ${fragmentClasses}
`
