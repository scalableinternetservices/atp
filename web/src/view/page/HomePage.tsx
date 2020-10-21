import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import {
	Appointments,
	AppointmentTooltip,
	Resources,
	Scheduler,
	WeekView
} from '@devexpress/dx-react-scheduler-material-ui'
import { TableFooter } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Link } from '../nav/Link'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const appointments: Array<AppointmentModel> = [
  {
    startDate: new Date(2020, 9, 13, 10, 15), // Month is 0-indexed
    endDate: new Date(2020, 9, 13, 11, 45),
    title: 'CS 118',
    type: 'class',
    rRule: 'FREQ=WEEKLY;BYDAY=TU,TH',
  },
  {
    startDate: new Date(2020, 9, 17, 8, 0),
    endDate: new Date(2020, 9, 17, 9, 50),
    title: 'Go to a gym',
    type: 'work',
  },
]

const resources = [
  {
    fieldName: 'type',
    title: 'Type',
    instances: [
      { id: 'class', text: 'Class', color: '#EC407A' },
      { id: 'work', text: 'Work', color: '#7E57C2' },
    ],
  },
]

function createData(name: string, zoom: string) {
  return { name, zoom }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  const sample = [
    createData('CS 188', 'https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09'),
    createData('CS 118', 'https://ucla.zoom.us/j/95034758361?pwd=WWtFYU9YVWpLTlVMeCt0RFBuTEg1Zz09'),
  ]
  const [rows, setRows] = React.useState(sample)
  const classes = useStyles()
  const classNameInput = React.createRef<HTMLInputElement>()
  const zoomLinkInput = React.createRef<HTMLInputElement>()
  return (
    <div>
      <Page>
        <Paper>
          <Scheduler height={400} data={appointments}>
            <WeekView startDayHour={8} endDayHour={20} cellDuration={60} />
            <Appointments />
            <AppointmentTooltip showCloseButton />
            <Resources data={resources} />
          </Scheduler>
        </Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Class Name</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">Zoom Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {' '}
                    <Link href={row.zoom}>Zoom</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <input ref={classNameInput} type="text" placeholder="Class Name" />
                </TableCell>
                <TableCell>
                  <input ref={zoomLinkInput} type="text" placeholder="Zoom Link" />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      const className = classNameInput.current!.value
                      const zoomLink = zoomLinkInput.current!.value
                      const new_rows = [...rows, createData(className, zoomLink)]
                      setRows(new_rows)
                      classNameInput.current!.value = ''
                      zoomLinkInput.current!.value = ''
                      // console.log(rows)
                    }}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Page>
    </div>
  )
}
