import { ApolloClient, gql } from '@apollo/client'
import { AddFriend, AddFriendVariables, FriendInput } from '../../../graphql/query.gen'

export const addFriendMutation = gql`
  mutation AddFriend($input: FriendInput!) {
    addFriend(input: $input)
  }
`

export function mutateFriend(client: ApolloClient<any>, input: FriendInput) {
  return client.mutate<AddFriend, AddFriendVariables>({
    mutation: addFriendMutation,
    variables: { input },
  })
}
