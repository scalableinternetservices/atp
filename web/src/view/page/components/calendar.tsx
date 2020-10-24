import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import {
	Appointments,
	AppointmentTooltip,
	Resources,
	Scheduler,
	WeekView
} from '@devexpress/dx-react-scheduler-material-ui'
import Paper from '@material-ui/core/Paper'
// import { RouteComponentProps } from '@reach/router'
import * as React from 'react'

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

const appointments: Array<AppointmentModel> = [
  {
    startDate: new Date(2020, 9, 13, 10, 15), // Month is 0-indexed
    endDate: new Date(2020, 9, 13, 11, 45),
    title: 'CS 118',
    type: 'class',
    rRule: 'FREQ=WEEKLY;BYDAY=TU,TH',
  },
  {
    startDate: new Date(2020, 9, 17, 8, 0),
    endDate: new Date(2020, 9, 17, 9, 50),
    title: 'Go to a gym',
    type: 'work',
  },
]

export function Calendar() {
  return (
    <React.Fragment>
      <Paper>
        <Scheduler height={400} data={appointments}>
          <WeekView startDayHour={8} endDayHour={20} cellDuration={60} />
          <Appointments />
          <AppointmentTooltip showCloseButton />
          <Resources data={resources} />
        </Scheduler>
      </Paper>
    </React.Fragment>
  )
}
