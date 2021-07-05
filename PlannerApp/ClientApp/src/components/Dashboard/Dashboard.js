import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import ProfileCard from './ProfileCard'
import LayerCard from './LayerCard'
import TeamCard from './TeamCard'
import TodaysMeetings from './TodaysMeetings'
import { getDashboardInfo } from '../../redux/actions/dashboardActions'
import { getNotifications } from '../../redux/actions/userActions'

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 500,
  },
}))

const Dashboard = props => {
  useEffect(() => {
    props.getDashboardInfo(props.user.id)
  }, [props.user])

  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <React.Fragment>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={3}>
              <Paper className={fixedHeightPaper}>
                <ProfileCard />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={9}>
              <Paper className={fixedHeightPaper}>
                {/* <LayerCard /> */}
                <TeamCard />
              </Paper>
            </Grid>
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
              </Paper>
            </Grid> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TodaysMeetings meetings={props.dashboard.meetings} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </React.Fragment>
  )
}

export default connect(({ dashboard, user }) => ({ dashboard, user }), {
  getDashboardInfo,
  getNotifications,
})(Dashboard)
