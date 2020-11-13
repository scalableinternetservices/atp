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
import { FetchFriends, FetchFriendsVariables, FetchFriends_friends } from '../../../graphql/query.gen'
import { fetchFriends } from '../db/fetchFriends'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

interface FriendsProps {
  email: string
  handleChange(event: React.ChangeEvent<any>): void
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
              {/* <TableCell align="left">Friends</TableCell> */}
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
