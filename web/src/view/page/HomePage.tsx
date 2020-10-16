import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Link } from '../nav/Link';
import { AppRouteParams } from '../nav/route';
import { Page } from './Page';

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, zoom: string) {
  return { name, zoom};
}

const rows = [
  createData('CS 188', 'https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09'),
  createData('CS 118', 'https://ucla.zoom.us/j/95034758361?pwd=WWtFYU9YVWpLTlVMeCt0RFBuTEg1Zz09'),
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  const classes = useStyles();
  return (
    <Page>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Class Name</TableCell>
            <TableCell align="right">Zoom Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right"> <Link href={row.zoom}>Zoom</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Page>
  )
}
