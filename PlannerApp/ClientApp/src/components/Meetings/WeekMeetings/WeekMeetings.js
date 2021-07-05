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
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Button from '@material-ui/core/Button'
import { deleteMeeting } from '../../../redux/actions/meetingActions'

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
  const [openDialog, setOpenDialog] = React.useState(false)
  const [rowId, setRowId] = React.useState(0)

  const handleClickOpen = id => {
    setRowId(id)
    setOpenDialog(true)
  }

  const handleClose = rowId => {
    setOpenDialog(false)
  }

  const handleDelete = () => {
    props.deleteMeeting({
      userId: props.userId,
      meetingId: rowId,
    })
  }

  const classes = useRowStyles()

  const renderConfirmedResponse = response => {
    switch (response) {
      case true:
        return <CheckCircleIcon style={{ color: 'green' }} />
      case false:
        return <CheckCircleIcon style={{ color: 'red' }} />
      default:
        return <CheckCircleIcon style={{ color: 'gray' }} />
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
          <IconButton
            aria-label="delete"
            onClick={() => handleClickOpen(row.meetingId)}
          >
            <DeleteIcon />
          </IconButton>
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

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Stergere meeting?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esti sigur ca vrei sa stergi acest meeting?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Da
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Nu
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

const WeekMeetings = props => {
  const { meetings } = props

  const renderMeetingsTable = () => {
    if (
      meetings &&
      meetings.weekMeetings &&
      meetings.weekMeetings.length === 0
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
              {meetings.weekMeetings.map(row => (
                <Row
                  key={row.meetingId}
                  row={row}
                  userId={props.user.id}
                  deleteMeeting={props.deleteMeeting}
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
        Meeting-urile tale
      </Typography>
      {renderMeetingsTable()}
    </React.Fragment>
  )
}
export default connect(({ user, meetings }) => ({ user, meetings }), {
  deleteMeeting,
})(WeekMeetings)
