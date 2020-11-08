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
  TableRow,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import { FetchFriends, FetchFriendsVariables } from '../../../graphql/query.gen'
import { fetchFriends } from '../db/fetchFriends'
function showFriend(event: React.ChangeEvent<{}>, checked: boolean) {
  // if (!checked) return []
  // const { loading, data } = useQuery<FetchClasses, FetchClassesVariables>(fetchClasses, { variables: { id } })
  // if (loading) {
  //   return <div>loading...</div>
  // }
  // if (!data) {
  //   return <div>no classes</div>
  // }
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
                  <FormControlLabel control={<Switch />} label="" onChange={showFriend} id={f!}></FormControlLabel>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </FormGroup>
  )
}
