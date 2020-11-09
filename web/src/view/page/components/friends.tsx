import { useQuery } from '@apollo/client'
import {
  Fab,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import { FetchClasses, FetchClassesVariables, FetchFriends, FetchFriendsVariables } from '../../../graphql/query.gen'
import { fetchClasses } from '../db/fetchClasses'
import { fetchFriends } from '../db/fetchFriends'

function handleChange(event: React.ChangeEvent<any>) {
  const email = event.target.name
  if (event.target.checked) {
    // TODO: Show calendar... data fetch doesn't seem to work
    const { loading, data } = useQuery<FetchClasses, FetchClassesVariables>(fetchClasses, { variables: { email } })
    if (loading) {
      alert('loading...')
    }
    if (!data) {
      alert('no classes')
    } else {
      alert('found data!')
    }
  } else {
    // TODO: Turn off calendar
    alert('unchecked')
  }
}

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

export function Friends({ email }: { email: string }) {
  const { loading, data } = useQuery<FetchFriends, FetchFriendsVariables>(fetchFriends, { variables: { email } })
  let friends: (string | null)[]
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.friends) {
    friends = []
  } else friends = data.friends.friends

  // const [friends, setFriends] = React.useState(sample)

  const usernameInput = React.createRef<HTMLInputElement>()
  const classes = useStyles()
  return (
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
                    // const newFriends = [...friends, createFriend(usernameInput.current!.value)]
                    // setFriends(newFriends)
                    usernameInput.current!.value = ''
                  }}
                >
                  <AddIcon />
                </Fab>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {friends.map((f, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {f}
                </TableCell>
                <TableCell align="right">
                  {' '}
                  <FormControlLabel control={<Switch />} label="" onChange={handleChange} name={f!}></FormControlLabel>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </FormGroup>
  )
}
