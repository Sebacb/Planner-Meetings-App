import * as React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Scheduler, WeekView } from '@progress/kendo-react-scheduler'
import {
  createMeeting,
  deleteMeeting,
} from '../../redux/actions/meetingActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import '@progress/kendo-date-math/tz/Europe/Bucharest'

const useStyles = makeStyles(theme => ({
  customScheduler: {
    height: '80vh !important',
  },
}))

const AppScheduler = props => {
  const classes = useStyles()
  const [view, setView] = React.useState('week')
  const [date, setDate] = React.useState(new Date(Date.now()))
  const [orientation, setOrientation] = React.useState('horizontal')
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
    props.history.replace('/meetings')
  }

  const handleViewChange = React.useCallback(
    event => {
      setView(event.value)
    },
    [setView],
  )

  const parseAdjust = eventDate => {
    const date = new Date(eventDate)
    date.setFullYear(new Date().getFullYear())
    return date
  }

  React.useEffect(() => {
    const mergedArray = props.meetings.weekMeetings.map(row => {
      return {
        id: row.meetingId,
        start: new Date(row.start),
        startTimezone: null,
        end: new Date(row.end),
        endTimezone: null,
        isAllDay: false,
        title: row.subject,
        description: row.description,
        recurrenceRule: null,
        recurrenceId: null,
        recurrenceExceptions: null,
        roomId: 1,
        ownerID: props.user.id,
        personId: row.attendees[0].employeeId,
      }
    })
    const otherMeetings = props.meetings.otherMeetings.map(row => {
      return {
        id: row.meetingId,
        start: new Date(row.start),
        startTimezone: null,
        end: new Date(row.end),
        endTimezone: null,
        isAllDay: false,
        title: row.subject,
        description: row.description,
        recurrenceRule: null,
        recurrenceId: null,
        recurrenceExceptions: null,
        roomId: 1,
        ownerID: row.responsibleId,
        personId: row.attendees.find(e => e.employeeId === row.responsibleId)
          .employeeName,
      }
    })
    setData([...mergedArray, ...otherMeetings])
  }, [props.meetings, props.user])

  const handleDateChange = React.useCallback(
    event => {
      setDate(event.value)
    },
    [setDate],
  )

  const handleDataChange = React.useCallback(
    ({ created, updated, deleted }) => {
      if (props.user.role !== 'JuniorDeveloper') {
        if (Array.isArray(created) && created.length > 0) {
          props
            .createMeeting({ ...created[0], userId: props.user.id })
            .then(() => setOpen(true))
          return
        }
        if (Array.isArray(deleted) && deleted.length > 0) {
          props.deleteMeeting({
            userId: props.user.id,
            meetingId: deleted[0].id,
          })
        }
      } else {
        alert('Functionalitate indispoinbila pentru rolul curent.')
      }
    },
  )

  const renderResponsibles = () => {
    let options = []
    if (
      props.team &&
      Array.isArray(props.team.employees) &&
      props.team.employees.length === 0
    ) {
      return []
    } else {
      options =
        props.team &&
        props.team.employees &&
        props.team.employees.map((r, idx) => {
          return {
            text: r.name,
            value: r.id,
            color: `#5${idx}${idx}2E4`,
          }
        })
      if (!options) {
        return []
      }
      options = options.concat({
        text: 'Echipa curenta',
        value: 0,
        color: '#2a9d8f',
      })
    }
    return options
  }

  return (
    <React.Fragment>
      <Scheduler
        timezone="Europe/Bucharest"
        data={data}
        onDataChange={handleDataChange}
        view={view}
        onViewChange={handleViewChange}
        date={date}
        editable={true}
        onDateChange={handleDateChange}
        className={classes.customScheduler}
        group={{
          resources: ['Rooms'],
          orientation,
        }}
        resources={[
          {
            name: 'Rooms',
            data: [{ text: 'My Agenda', value: 1 }],
            field: 'RoomID',
            valueField: 'value',
            textField: 'text',
            colorField: 'color',
          },
          {
            name: 'Persons',
            data: renderResponsibles(),
            field: 'PersonIDs',
            valueField: 'value',
            textField: 'text',
            colorField: 'color',
          },
        ]}
      >
        <WeekView />
      </Scheduler>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Meeting nou'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Meeting-ul a fost creeat cu succes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default connect(
  ({ responsibles, user, team, meetings }) => ({
    responsibles,
    user,
    team,
    meetings,
  }),
  {
    createMeeting,
    deleteMeeting,
  },
)(AppScheduler)
