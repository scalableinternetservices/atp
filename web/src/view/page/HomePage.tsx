import { useQuery } from '@apollo/client'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchClasses, FetchClassesVariables, FetchClasses_classes } from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Friends } from './components/friends'
import { fetchClasses } from './db/fetchClasses'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

export function HomePage(props: HomePageProps) {
  // get user's classes
  const user = React.useContext(UserContext)
  const email = user.getEmail()
  if (!email) {
    return (
      <React.Fragment>
        <Page>
          <div>please login</div>
        </Page>
      </React.Fragment>
    )
  }
  const { loading, data } = useQuery<FetchClasses, FetchClassesVariables>(fetchClasses, { variables: { email } })
  if (loading) {
    return <div>loading...</div>
  }
  let classes: FetchClasses_classes[] = []
  if (!data) {
  } else classes = data.classes

  // get friends' classes as switch toggles
  const toggle = true
  const tmp: string[] = []
  const [friends, setFriends] = React.useState(tmp)
  const handleChange = (event: React.ChangeEvent<any>) => {
    const friendEmail = event.target.name
    if (event.target.checked) {
      setFriends([...friends, friendEmail])
    } else {
      const index = friends.indexOf(friendEmail, 0)
      if (index > -1) {
        friends.splice(index, 1)
        setFriends([...friends])
      }
    }
  }
  return (
    <React.Fragment>
      <Page>
        <Table>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top' }}>
              <Friends email={email} handleChange={handleChange} />
            </TableCell>
            <TableCell>
              {' '}
              <Calendar
                userEmail={email}
                classes={classes}
                friendEmail={friends.length ? friends[friends.length - 1] : null}
                toggle={toggle}
              />{' '}
            </TableCell>
          </TableRow>
        </Table>
      </Page>
    </React.Fragment>
  )
}
