import { useQuery, useSubscription } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import {
  ClassesSubscription,
  ClassesSubscriptionVariables,
  FetchClasses,
  FetchClassesVariables,
} from '../../graphql/query.gen'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Exams } from './components/exams'
import { Friends } from './components/friends'
import { fetchClasses, subscribeClasses } from './db/fetchClasses'
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
  // const classesTmp: FetchClasses_classes[] = []
  const [friends, setFriends] = React.useState(tmp)

  // get user's email
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

  // fetch user's classes

  const { loading, data } = useQuery<FetchClasses, FetchClassesVariables>(fetchClasses, {
    variables: { email },
    // pollInterval: 1000,
  })

  const [classes, setClasses] = React.useState(data?.classes)

  React.useEffect(() => {
    if (data?.classes) {
      setClasses(data.classes)
    }
  }, [data])

  // subscribe to user's classes
  const sub = useSubscription<ClassesSubscription, ClassesSubscriptionVariables>(subscribeClasses, {
    variables: { email },
  })
  React.useEffect(() => {
    if (sub.data?.classesUpdates) {
      setClasses(sub.data.classesUpdates)
    }
  }, [sub.data])

  if (loading) {
    return <div>loading...</div>
  }
  // if (!data) {
  // }
  // // else setClasses(data.classes)

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
        <Exams email={email} classes={classes} />
      </Page>
    </React.Fragment>
  )
}
