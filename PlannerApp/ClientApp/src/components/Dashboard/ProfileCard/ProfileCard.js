import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  infoText: {
    marginTop: '10px',
  },
}))

const ProfileCard = props => {
  const { user } = props
  const classes = useStyles()
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Profile Info
      </Typography>
      <TextField
        label="Name"
        key={0}
        defaultValue={user.name}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        className={classes.infoText}
        label="Surname"
        key={1}
        defaultValue={user.surname}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        className={classes.infoText}
        key={2}
        label="Department"
        defaultValue={`${user.department} - ${user.role}`}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        className={classes.infoText}
        key={3}
        label="Email"
        defaultValue={user.email}
        InputProps={{
          readOnly: true,
        }}
      />
    </React.Fragment>
  )
}
export default connect(({ user }) => ({ user }), null)(ProfileCard)
