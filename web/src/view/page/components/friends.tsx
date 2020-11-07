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
function showFriend(event: React.ChangeEvent<{}>, checked: boolean) {
  /* show friends calendar */
}

function createFriend(username: string) {
  return { username }
}

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

export function Friends() {
  const sample = [createFriend('adgrf'), createFriend('grifw')]

  const [friends, setFriends] = React.useState(sample)

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
