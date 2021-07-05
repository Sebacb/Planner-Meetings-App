import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthorizationHeader } from '../../configs/client'
import NavigationBar from '../NavigationBar'
import ChatWrapper from '../ChatWrapper/ChatWrapper'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}))

const PrivateRoute = ({ component: Component, token, userId, ...rest }) => {
  const classes = useStyles()
  return (
    <Route
      {...rest}
      render={props => {
        if (!token) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
        setAuthorizationHeader(token)
        return (
          <div className={classes.root}>
            <CssBaseline />
            <NavigationBar {...props} />
            {/* <ChatWrapper /> */}
            <Component {...props} />
          </div>
        )
      }}
    />
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    token: state.user.token,
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
