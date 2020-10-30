import { AppointmentModel, ChangeSet, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  Resources,
  Scheduler,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui'
import Paper from '@material-ui/core/Paper'
// import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Classes } from '../../../../../server/src/entities/Classes'

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

const Appointment: React.ComponentType<Appointments.AppointmentProps> = props => {
  return <Appointments.Appointment {...props} onClick={() => window.open(props.data.notes)} />
}

const appointments: Array<AppointmentModel> = [
  {
    startDate: new Date(2020, 9, 13, 10, 0), // Month is 0-indexed
    endDate: new Date(2020, 9, 13, 11, 50),
    title: 'CS 118',
    type: 'class',
    rRule: 'FREQ=WEEKLY;BYDAY=TU,TH',
    notes: 'https://ucla.zoom.us/j/95034758361?pwd=WWtFYU9YVWpLTlVMeCt0RFBuTEg1Zz09',
  },
  {
    startDate: new Date(2020, 9, 12, 8, 0), // Month is 0-indexed
    endDate: new Date(2020, 9, 12, 9, 50),
    title: 'CS 188',
    type: 'class',
    rRule: 'FREQ=WEEKLY;BYDAY=TU,TH',
    notes: 'https://ucla.zoom.us/j/92470409406?pwd=eFpyYWFQZGRtcVUzWC9HYlhSakRxZz09',
  },
]

export class Calendar extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: appointments,
    }

    this.commitChanges = this.commitChanges.bind(this)
  }

  commitChanges(changes: ChangeSet) {
    const { added, changed, deleted } = changes
    this.setState((state: any) => {
      let { data } = state
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
        data = [...data, { id: startingAddedId, ...added }]
      }
      if (changed) {
        data = data.map((appointment: any) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        )
      }
      if (deleted !== undefined) {
        data = data.filter((appointment: any) => appointment.id !== deleted)
      }
      return { data }
    })
  }

  render() {
    const { data } = this.state

    return (
      <React.Fragment>
        <Paper>
          <Scheduler height={600} data={data}>
            <WeekView startDayHour={8} endDayHour={20} cellDuration={60} />
            <EditingState onCommitChanges={this.commitChanges} />
            <Appointments appointmentComponent={Appointment} />
            <IntegratedEditing />
            <ConfirmationDialog />
            <Resources data={resources} />
            <AppointmentTooltip visible={false} />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </React.Fragment>
    )
  }
}
