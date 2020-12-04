import { gql } from '@apollo/client'

export const fragmentExams = gql`
  fragment Exams on Exam {
    id
    email
    title
    type
    date
  }
`

export const fetchExams = gql`
  query FetchExams($email: String!) {
    exams(email: $email) {
      ...Exams
    }
  }
  ${fragmentExams}
`
