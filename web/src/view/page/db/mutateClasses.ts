import { ApolloClient, gql } from '@apollo/client'
import { AddClass, AddClassVariables, ClassInput } from '../../../graphql/query.gen'

export const addClassMutation = gql`
  mutation AddClass($input: ClassInput!) {
    createClass(input: $input)
  }
`

export function mutateClass(client: ApolloClient<any>, input: ClassInput) {
  return client.mutate<AddClass, AddClassVariables>({
    mutation: addClassMutation,
    variables: { input },
  })
}
