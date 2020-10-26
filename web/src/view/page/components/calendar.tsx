import { AppointmentModel } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  AppointmentTooltip,
  Resources,
  Scheduler,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
// import { RouteComponentProps } from '@reach/router'
import * as React from 'react';

// interface HomePageProps extends RouteComponentProps, AppRouteParams {}

const resources = [
  {
    fieldName: 'type',
    title: 'Type',
    instances: [
      { id: 'class', text: 'Class', color: '#EC407A' },
      { id: 'work', text: 'Work', color: '#7E57C2' },
    ],
  },
]

const Appointment: React.ComponentType<Appointments.AppointmentProps> = (props) =>
{
  return <Appointments.Appointment {...props} onClick={() => window.open(props.data.zoom)} />
}

const appointments: Array<AppointmentModel> = [
  {
    startDate: new Date(2020, 9, 13, 10, 0), // Month is 0-indexed
    endDate: new Date(2020, 9, 13, 11, 50),
    title: 'CS 118',
    type: 'class',
    rRule: 'FREQ=WEEKLY;BYDAY=TU,TH',
    zoom: 'https://ucla.zoom.us/j/95034758361?pwd=WWtFYU9YVWpLTlVMeCt0RFBuTEg1Zz09'
  },
  {
    startDate: new Date(2020, 9, 12, 8, 0), // Month is 0-indexed
    endDate: new Date(2020, 9, 12, 9, 50),
    title: 'CS 188',
    type: 'class',
    rRule: 'FREQ=WEEKLY;BYDAY=MO,WE',
    zoom: 'https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09'
  },
]

export function Calendar() {
  return (
    <React.Fragment>
      <Paper>
        <Scheduler height={600} data={appointments}>
          <WeekView startDayHour={8} endDayHour={20} cellDuration={60} />
          <Appointments appointmentComponent={Appointment}/>
          <AppointmentTooltip visible={false}/>
          <Resources data={resources} />
        </Scheduler>
      </Paper>
    </React.Fragment>
  )
}
