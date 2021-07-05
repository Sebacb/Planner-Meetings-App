import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import {
  deleteMeeting,
  confirmMeeting,
  declineMeeting,
} from '../../../redux/actions/meetingActions'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  const classes = useRowStyles()

  const renderConfirmedResponse = response => {
    switch (response) {
      case true:
        return <CheckCircleIcon style={{ color: 'green' }} />
      case false:
        return <CancelRoundedIcon style={{ color: 'red' }} />
      default:
        return <CheckCircleIcon style={{ color: 'gray' }} />
    }
  }

  const renderConfirmButtonState = (attendees, meetingId) => {
    const targetUser = attendees.find(
      element => element.employeeId === props.userId,
    )
    switch (targetUser.hasConfirmed) {
      case true:
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              props.declineMeeting({
                meetingId: meetingId,
                userId: props.userId,
              })
            }
          >
            Decline
          </Button>
        )
      case false:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              props.confirmMeeting({
                meetingId: meetingId,
                userId: props.userId,
              })
            }
          >
            Confirm
          </Button>
        )
      default:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              props.confirmMeeting({
                meetingId: meetingId,
                userId: props.userId,
              })
            }
          >
            Confirm
          </Button>
        )
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.subject}</TableCell>
        <TableCell>{row.start.substring(0, 10)}</TableCell>
        <TableCell>{row.start.substring(11)}</TableCell>
        <TableCell>{row.end.substring(11)}</TableCell>
        <TableCell>
          {renderConfirmButtonState(row.attendees, row.meetingId)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="meetingSubject"
                    label="Subject"
                    defaultValue={row.subject}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ width: '100%' }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="meetingStartDate"
                    label="Date"
                    defaultValue={new Date(row.start).toLocaleDateString()}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ width: '100%' }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="meetingTime"
                    label="Time"
                    defaultValue={`${new Date(
                      row.start,
                    ).toLocaleTimeString()} - ${new Date(
                      row.end,
                    ).toLocaleTimeString()}`}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ width: '100%' }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Attendee</TableCell>
                          <TableCell align="center">Has confirmed</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.attendees.map((at, idx) => (
                          <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                              {at.employeeName}
                            </TableCell>
                            <TableCell align="center">
                              {renderConfirmedResponse(at.hasConfirmed)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
const OtherMeetings = props => {
  const { meetings } = props
  console.log(meetings)

  const renderMeetingsTable = () => {
    if (
      meetings &&
      meetings.otherMeetings &&
      meetings.otherMeetings.length === 0
    ) {
      return (
        <React.Fragment>
          Nu ai niciun meeting pentru saptamana curenta!
        </React.Fragment>
      )
    } else {
      return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Subiect</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meetings.otherMeetings.map(row => (
                <Row
                  key={row.meetingId}
                  row={row}
                  userId={props.user.id}
                  deleteMeeting={props.deleteMeeting}
                  confirmMeeting={props.confirmMeeting}
                  declineMeeting={props.declineMeeting}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Meeting-urile in care esti invitat
      </Typography>
      {renderMeetingsTable()}
    </React.Fragment>
  )
}
export default connect(({ user, meetings }) => ({ user, meetings }), {
  deleteMeeting,
  confirmMeeting,
  declineMeeting,
})(OtherMeetings)
