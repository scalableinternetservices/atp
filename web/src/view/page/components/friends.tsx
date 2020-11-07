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
  /* show friends calendar */
}

// function createFriend(username: string) {
//   return { username }
// }

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

export function Friends({ email }: { email: string }) {
  // const sample = [createFriend('adgrf'), createFriend('grifw')]
  const { loading, data } = useQuery<FetchFriends, FetchFriendsVariables>(fetchFriends, { variables: { email } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.friends) {
    return <div>no friends</div>
  }

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
            {data.friends.friends.map((f, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {f}
                </TableCell>
                <TableCell align="right">
                  {' '}
                  <FormControlLabel
                    control={<Switch />}
                    label=""
                    onChange={showFriend}
                    id={'checkbox' + f}
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

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// })

// interface EventEntry {
//   name: string
//   zoom: string
// }

// interface RowsProps {
//   entries: EventEntry[]
//   onAdd(name: string, zoom: string): void
// }

// export function Rows(prop: RowsProps) {
//   const classes = useStyles()
//   const classNameInput = React.createRef<HTMLInputElement>()
//   const zoomLinkInput = React.createRef<HTMLInputElement>()
//   return (
//     <React.Fragment>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Class Name</TableCell>
//               <TableCell></TableCell>
//               <TableCell align="right">Zoom Link</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {prop.entries.map(row => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="right">
//                   {' '}
//                   <Link href={row.zoom}>Zoom</Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell>
//                 <input ref={classNameInput} type="text" placeholder="Class Name" />
//               </TableCell>
//               <TableCell>
//                 <input ref={zoomLinkInput} type="text" placeholder="Zoom Link" />
//               </TableCell>
//               <TableCell align="right">
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={() => {
//                     const className = classNameInput.current!.value
//                     const zoomLink = zoomLinkInput.current!.value
//                     // const new_rows = [...rows, createData(className, zoomLink)]
//                     prop.onAdd(className, zoomLink)
//                     classNameInput.current!.value = ''
//                     zoomLinkInput.current!.value = ''
//                   }}
//                 >
//                   Add
//                 </Button>
//               </TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     </React.Fragment>
//   )
// }
