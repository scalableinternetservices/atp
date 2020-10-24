import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Calendar } from './components/calendar'
import { Rows } from './components/rows'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

function createData(name: string, zoom: string) {
  return { name, zoom }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  const sample = [
    createData('CS 188', 'https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09'),
    createData('CS 118', 'https://ucla.zoom.us/j/95034758361?pwd=WWtFYU9YVWpLTlVMeCt0RFBuTEg1Zz09'),
  ]
  const [rows, setRows] = React.useState(sample)
  const onAdd = (name: string, zoom: string) => {
    const new_rows = [...rows, createData(name, zoom)]
    setRows(new_rows)
  }
  return (
    <React.Fragment>
      <Page>
        <Calendar />
        <Rows entries={rows} onAdd={onAdd} />
      </Page>
    </React.Fragment>
  )
}
