import { FormGroup } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}
/*
function createData(name: string, zoom: string) {
  return { name, zoom }
}
*/
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

function showFriend(value: any) {
  /* show friends calendar */
}

function createFriend(userID: number, username: string) {
  return { userID, username }
}

const rows = [createFriend(123, 'adgrf'), createFriend(891, 'grifw')]

export function HomePage(props: HomePageProps) {
  /*
  const sample = [
    createData('CS 188', 'https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09'),
    createData('CS 118', 'https://ucla.zoom.us/j/95034758361?pwd=WWtFYU9YVWpLTlVMeCt0RFBuTEg1Zz09'),
  ]
  const [rows, setRows] = React.useState(sample)
  const onAdd = (name: string, zoom: string) => {
    const new_rows = [...rows, createData(name, zoom)]
    setRows(new_rows)
  }*/
  const classes = useStyles()
  return (
    <React.Fragment>
      <Page>
        <Table>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top' }}>
              <FormGroup>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Friends</TableCell>
                        <TableCell align="right">Show Calendar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.userID}>
                          <TableCell component="th" scope="row">
                            {row.username}
                          </TableCell>
                          <TableCell align="right">
                            {' '}
                            <FormControlLabel
                              control={<Switch />}
                              label=""
                              onChange={showFriend}
                              id={'checkbox' + row.userID}
                            ></FormControlLabel>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>{' '}
              </FormGroup>
            </TableCell>
            <TableCell>
              {' '}
              <Calendar />{' '}
            </TableCell>
          </TableRow>
        </Table>
      </Page>
    </React.Fragment>
  )
}
