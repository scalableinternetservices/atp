import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { FetchClasses, FetchClassesVariables, FetchClasses_classes } from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Friends } from './components/friends'
import { fetchClasses } from './db/fetchClasses'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

export function HomePage(props: HomePageProps) {
  const classesTable = useStyles()

  const tmp: string[] = []
  const [friends, setFriends] = useState(tmp)
  const [seconds, setSeconds] = useState(0)
  const pollInterval = 1000 // ms

  // get user's classes
  const user = useContext(UserContext)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1)
      console.log(seconds)
    }, pollInterval)
    return () => clearInterval(interval)
  }, [])

  let classes: FetchClasses_classes[] = []

  const { loading, data } = useQuery<FetchClasses, FetchClassesVariables>(fetchClasses, { variables: { email } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!loading && data) {
    console.log('user class fetched!')
    classes = data.classes
  }

  // get friends' classes as switch toggles
  const toggle = true
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
              <Friends email={email} handleChange={handleChange} classes={classesTable} />
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
