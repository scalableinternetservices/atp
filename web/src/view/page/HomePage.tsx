import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Friends } from './components/friends'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

export function HomePage(props: HomePageProps) {
  return (
    <React.Fragment>
      <Page>
        <Table>
          <TableRow>
            <TableCell style={{ verticalAlign: 'top' }}>
              <Friends />
            </TableCell>
            <TableCell>
              {' '}
              <Calendar />{' '}
            </TableCell>
          </TableRow>
        </Table>
      </Page>
    </React.Fragment>
  )
}
