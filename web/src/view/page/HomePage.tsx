import Fab from '@material-ui/core/Fab'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import AddIcon from '@material-ui/icons/Add'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

function showFriend(event: React.ChangeEvent<{}>, checked: boolean) {
  /* show friends calendar */
}

function createFriend(username: string) {
  return { username }
}

export function HomePage(props: HomePageProps) {
  const sample = [createFriend('adgrf'), createFriend('grifw')]

  const [friends, setFriends] = React.useState(sample)

  const usernameInput = React.createRef<HTMLInputElement>()
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
                        <TableCell align="left">Friends</TableCell>
                        <TableCell>
                          <input ref={usernameInput} type="text" placeholder="Add friend..." />
                        </TableCell>
                        <TableCell>
                          <Fab
                            color="primary"
                            aria-label="add"
                            size="small"
                            onClick={() => {
                              const newFriends = [...friends, createFriend(usernameInput.current!.value)]
                              setFriends(newFriends)
                              usernameInput.current!.value = ''
                            }}
                          >
                            <AddIcon />
                          </Fab>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {friends.map(friend => (
                        <TableRow key={friend.username}>
                          <TableCell component="th" scope="row">
                            {friend.username}
                          </TableCell>
                          <TableCell align="right">
                            {' '}
                            <FormControlLabel
                              control={<Switch />}
                              label=""
                              onChange={showFriend}
                              id={'checkbox' + friend.username}
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
