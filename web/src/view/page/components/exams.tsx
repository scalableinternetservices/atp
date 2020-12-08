import { useQuery } from '@apollo/client'
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
import { getApolloClient } from '../../../graphql/apolloClient'
import {
  ExamInput,
  FetchClasses_classes,
  FetchExams,
  FetchExamsVariables,
  FetchExams_exams
} from '../../../graphql/query.gen'
import { fetchExams } from '../db/fetchExams'
import { mutateExam } from '../db/mutateExams'

interface ExamsProps {
  email: string
  classes: FetchClasses_classes[]
}

function addExam(examTitle: string, examType: string, examDate: string, userEmail: string) {
  const examInput: ExamInput = {
    email: userEmail || '',
    title: examTitle || '',
    type: examType || '',
    date: examDate || '',
  }

  mutateExam(getApolloClient(), examInput)
    .then(() => window.location.reload())
    .catch((err: Error) => alert('Uh oh, adding an exam failed with the following message: ' + err.message))
}

export function Exams(prop: ExamsProps) {
  let exams: FetchExams_exams[] = []
  const { email, classes } = prop
  const { loading, data } = useQuery<FetchExams, FetchExamsVariables>(fetchExams, { variables: { email } })

  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.exams) {
  } else exams = data.exams

  const examClassInput = React.createRef<HTMLSelectElement>()
  const examTypeInput = React.createRef<HTMLInputElement>()
  const examDateInput = React.createRef<HTMLInputElement>()
  return (
    <FormGroup>
      <TableContainer component={Paper}>
        <Table className={'examsTable'} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <select ref={examClassInput}>
                  <option>Pick a class...</option>
                  {classes.map((c, i) => (
                    <option key={i} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <input ref={examTypeInput} type="text" placeholder="Exam type..." />
              </TableCell>
              <TableCell>
                <input ref={examDateInput} type="text" placeholder="Exam date..." />
              </TableCell>
              <TableCell>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  onClick={() => {
                    addExam(
                      examClassInput.current!.value,
                      examTypeInput.current!.value,
                      examDateInput.current!.value,
                      email
                    )
                    examTypeInput.current!.value = ''
                    examDateInput.current!.value = ''
                  }}
                >
                  <AddIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((e, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {e.title}
                </TableCell>
                <TableCell>{e.type}</TableCell>
                <TableCell component="th">{new Date(parseInt(e.date)).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </FormGroup>
  )
}
