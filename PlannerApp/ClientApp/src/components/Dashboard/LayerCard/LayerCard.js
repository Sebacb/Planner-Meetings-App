import React from 'react'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const LayerCard = props => {
  const renderResponsibles = () => {
    const { responsibles } = props.dashboard
    return (
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Employee</TableCell>
            <TableCell align="left">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responsibles &&
            responsibles.map((r, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{r.employeeName}</TableCell>
                  <TableCell>{r.relationship}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    )
  }
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Responsibles
      </Typography>
      {renderResponsibles()}
    </React.Fragment>
  )
}
export default connect(({ dashboard }) => ({ dashboard }))(LayerCard)
