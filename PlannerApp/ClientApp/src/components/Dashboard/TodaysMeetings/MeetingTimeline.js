import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}))

const MeetingTimeline = props => {
  const classes = useStyles() 

  return (
    <Timeline align="alternate">
      {props.meets &&
        props.meets.map((row,idx) => {
          return (
            <TimelineItem key={idx}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {new Date(row.start).toLocaleTimeString()} -{' '}
                  {new Date(row.end).toLocaleTimeString()}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <LaptopMacIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {row.meetingSubject}
                  </Typography>
                  <Typography>Description: {row.meetingDescription}</Typography>
                  <Typography>Owner: {row.ownerName}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
        })}
    </Timeline>
  )
}
export default MeetingTimeline
