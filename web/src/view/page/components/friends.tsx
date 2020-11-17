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
import { getApolloClient } from '../../../graphql/apolloClient'
import { FetchFriends, FetchFriendsVariables, FetchFriends_friends, FriendInput } from '../../../graphql/query.gen'
import { fetchFriends } from '../db/fetchFriends'
import { mutateFriend } from '../db/mutateFriends'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

interface FriendsProps {
  email: string
  handleChange(event: React.ChangeEvent<any>): void
}

function addFriend(friendEmail: string, userEmail: string) {
  const friendInput: FriendInput = {
    friend: friendEmail || '',
    email: userEmail || '',
  }

  mutateFriend(getApolloClient(), friendInput)
    .then(() => window.location.reload())
    .catch((err: Error) => alert('Uh oh, adding a friend failed with the following message: ' + err.message))
}

export function Friends(prop: FriendsProps) {
  let friends: FetchFriends_friends[] = []
  const { email, handleChange } = prop
  const { loading, data } = useQuery<FetchFriends, FetchFriendsVariables>(fetchFriends, { variables: { email } })

  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.friends) {
  } else friends = data.friends

  // const [friends, setFriends] = React.useState(sample)

  const usernameInput = React.createRef<HTMLInputElement>()
  const classes = useStyles()
  return (
    <FormGroup>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <input ref={usernameInput} type="text" placeholder="Add friend..." />
              </TableCell>
              <TableCell>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  onClick={() => {
                    addFriend(usernameInput.current!.value, email)
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
                  {f.friends}
                </TableCell>
                <TableCell align="right">
                  {' '}
                  <FormControlLabel
                    control={<Switch />}
                    label=""
                    onChange={handleChange}
                    name={f.friends!}
                  ></FormControlLabel>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{' '}
    </FormGroup>
  )
}
