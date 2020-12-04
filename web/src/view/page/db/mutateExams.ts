import { ApolloClient, gql } from '@apollo/client'
import { AddExam, AddExamVariables, ExamInput } from '../../../graphql/query.gen'

export const addExamMutation = gql`
  mutation AddExam($input: ExamInput!) {
    addExam(input: $input)
  }
`

export function mutateExam(client: ApolloClient<any>, input: ExamInput) {
  return client.mutate<AddExam, AddExamVariables>({
    mutation: addExamMutation,
    variables: { input },
  })
}
