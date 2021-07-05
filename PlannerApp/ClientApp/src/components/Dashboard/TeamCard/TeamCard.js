import React from 'react'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { connect } from 'react-redux'
import { getTeamInfo } from '../../../redux/actions/teamActions'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  infoText: {
    marginTop: '10px',
  },
}))

const TeamCard = props => {
  const classes = useStyles()
  React.useEffect(() => {
    if (!props.team) {
      props.getTeamInfo(props.user.teamId)
    }
  }, [props.team, props.user])

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Team
      </Typography>
      {props.team && (
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nume</TableCell>
                <TableCell>Prenume</TableCell>
                <TableCell>Numar Telefon</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.team.employees &&
                props.team.employees.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.surname}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  )
}
export default connect(({ user, team }) => ({ user, team }), { getTeamInfo })(
  TeamCard,
)
