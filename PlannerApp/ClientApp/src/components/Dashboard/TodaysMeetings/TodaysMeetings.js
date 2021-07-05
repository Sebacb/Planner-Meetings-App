import React from 'react'
import Typography from '@material-ui/core/Typography'
import MeetingTimeline from './MeetingTimeline.js'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  infoText: {
    marginTop: '10px',
  },
}))

const TodaysMeetings = props => {
  const { meetings } = props
  const classes = useStyles()

  const renderUserMeetings = () => {
    if (Array.isArray(meetings) && meetings.length === 0) {
      return (
        <React.Fragment>
          <Typography> You have no meetings today.</Typography>
        </React.Fragment>
      )
    } else {
      return <MeetingTimeline meets={meetings} />
    }
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Today's Meetings
      </Typography>
      {renderUserMeetings()}
    </React.Fragment>
  )
}
export default TodaysMeetings
