import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Friends } from './components/friends'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

export function HomePage(props: HomePageProps) {
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
  return (
    <React.Fragment>
      <Page>
        <Table>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top' }}>
              <Friends email={email} />
            </TableCell>
            <TableCell>
              {' '}
              <Calendar email={email} />{' '}
            </TableCell>
          </TableRow>
        </Table>
      </Page>
    </React.Fragment>
  )
}
