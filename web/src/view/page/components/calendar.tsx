import { ChangeSet, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  Resources,
  Scheduler,
  WeekView,
} from '@devexpress/dx-react-scheduler-material-ui'
import Paper from '@material-ui/core/Paper'
// import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchClasses_classes } from '../../../graphql/query.gen'

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
  return <Appointments.Appointment {...props} onClick={() => window.open(props.data.link)} />
}

const messages = {
  moreInformationLabel: '',
}

const TextEditor = (props: any) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null
  }
  return <AppointmentForm.TextEditor {...props} />
}

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }: any) => {
  const onLinkChange = (nextValue: any) => {
    onFieldChange({ link: nextValue })
  }

  return (
    <AppointmentForm.BasicLayout appointmentData={appointmentData} onFieldChange={onFieldChange} {...restProps}>
      <AppointmentForm.Label text="Zoom Link" type="titleLabel" />
      <AppointmentForm.TextEditor
        value={appointmentData.link}
        onValueChange={onLinkChange}
        placeholder="Zoom Link"
        readOnly={false}
        type="titleTextEditor"
      />
    </AppointmentForm.BasicLayout>
  )
}

function commitChanges(changes: ChangeSet) {
  const { added, changed, deleted } = changes
  // TODO mutation
  if (added) {
    // const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
    // data = [...data, { id: startingAddedId, ...added }]
  }
  if (changed) {
    // data = data.map((appointment: any) =>
    //   changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
    // )
  }
  if (deleted !== undefined) {
    // data = data.filter((appointment: any) => appointment.id !== deleted)
  }
}

export function Calendar({ classes, friends }: { classes: FetchClasses_classes[]; friends: string[] }) {
  return (
    <React.Fragment>
      <Paper>
        <Scheduler
          height={600}
          data={classes.map((c, i) => ({
            startDate: new Date(Number(c.startDate)),
            endDate: new Date(Number(c.endDate)),
            title: c.title,
            type: 'class',
            rRule: c.rRule,
            link: c.zoom,
          }))}
        >
          <WeekView startDayHour={8} endDayHour={20} cellDuration={60} />
          <EditingState onCommitChanges={commitChanges} />
          <Appointments appointmentComponent={Appointment} />
          <IntegratedEditing />
          <ConfirmationDialog />
          <Resources data={resources} />
          <AppointmentTooltip visible={false} />
          <AppointmentForm basicLayoutComponent={BasicLayout} textEditorComponent={TextEditor} messages={messages} />
        </Scheduler>
      </Paper>
    </React.Fragment>
  )
}

// // export class Calendar2 extends React.PureComponent<any, any> {
// //   constructor(props: any) {
// //     super(props)
// //     this.state = {
// //       data: appointments,
// //     }

// //     this.commitChanges = this.commitChanges.bind(this)
// //   }

// //   commitChanges(changes: ChangeSet) {
// //     const { added, changed, deleted } = changes
// //     this.setState((state: any) => {
// //       let { data } = state
// //       if (added) {
// //         const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0
// //         data = [...data, { id: startingAddedId, ...added }]
// //       }
// //       if (changed) {
// //         data = data.map((appointment: any) =>
// //           changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
// //         )
// //       }
// //       if (deleted !== undefined) {
// //         data = data.filter((appointment: any) => appointment.id !== deleted)
// //       }
// //       return { data }
// //     })
// //   }

// //   render() {
// //     const { data } = this.state

// //     return (
// //       <React.Fragment>
// //         <Paper>
// //           <Scheduler height={600} data={data}>
// //             <WeekView startDayHour={8} endDayHour={20} cellDuration={60} />
// //             <EditingState onCommitChanges={this.commitChanges} />
// //             <Appointments appointmentComponent={Appointment} />
// //             <IntegratedEditing />
// //             <ConfirmationDialog />
// //             <Resources data={resources} />
// //             <AppointmentTooltip visible={false} />
// //             <AppointmentForm basicLayoutComponent={BasicLayout} textEditorComponent={TextEditor} messages={messages} />
// //           </Scheduler>
// //         </Paper>
// //       </React.Fragment>
// //     )
// //   }
// // }
