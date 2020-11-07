import { gql } from '@apollo/client'

export const fragmentFriends = gql`
  fragment Friends on Friends {
    id
    friends
  }
`

export const fetchFriends = gql`
  query FetchFriends($email: String!) {
    friends(email: $email) {
      ...Friends
    }
  }
  ${fragmentFriends}
`
