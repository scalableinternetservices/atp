import {
  Fab,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
// import { getApolloClient } from '../../../graphql/apolloClient'
// import { FetchExams, FetchExamsVariables, FetchExams_exams, ExamInput } from '../../../graphql/query.gen'
// import { fetchExams } from '../db/fetchExams'
// import { mutateExams } from '../db/mutateExams'

interface ExamsProps {
  email: string
  handleChange(event: React.ChangeEvent<any>): void
  classes: Record<'table', string>
}

export function Exams(prop: ExamsProps) {
  /*
  const exams: FetchExams_exams[] = []
  const { email, handleChange, classes } = prop
  const { loading, data } = useQuery<FetchExams, FetchExamsVariables>(fetchExams, { variables: { email } })

  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.friends) {
  } else friends = data.friends
  */
  // const examInput = React.createRef<HTMLInputElement>()
  return (
    <FormGroup>
      <TableContainer component={Paper}>
        <Table className={'PLACEHOLDER'} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <input type="text" placeholder="Add exam..." />
              </TableCell>
              <TableCell>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  onClick={() => {
                    // addExam(usernameInput.current!.value, email)
                    // usernameInput.current!.value = ''
                  }}
                >
                  <AddIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*exams.map((e, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {e.exams}
                </TableCell>
                <TableCell align="right">
                  {' '}
                  <FormControlLabel
                    control={<Switch />}
                    label=""
                    onChange={handleChange}
                    name={e.exams!}
                  ></FormControlLabel>
                </TableCell>
              </TableRow>
            ))*/}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </FormGroup>
  )
}
