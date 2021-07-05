import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
// import TextField from '@material-ui/core/TextField'
// import SearchIcon from '@material-ui/icons/Search'
// import IconButton from '@material-ui/core/IconButton'
import { getLogs } from '../../redux/actions/logsActions'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'

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
    height: 300,
  },
  filterArea: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    marginBottom: '1em',
  },
  filterButton: {
    marginRight: '1em',
  },
  warningFilterButton: {
    backgroundColor: '#ffba08',
  },
  errorFilterButton: {
    backgroundColor: '#ec7505',
  },
  fatalFilterButton: {
    backgroundColor: '#ae2012',
  },
  filterSearchBox: {
    margin: '0 0 0 auto',
  },
}))

const Logs = props => {
  const classes = useStyles()
  const [elementsPerPage, setElementsPerPage] = React.useState(10)
  const [tablePage, setTablePage] = React.useState(0)
  const [skipElements, setSkipElements] = React.useState(0)
  const [tableData, setTableData] = React.useState([])
  const [elementsCount, setElementsCount] = React.useState(0)
  const [activeFiltering, setActiveFiltering] = React.useState({
    warning: false,
    error: false,
    fatal: false,
    stringFilter: '',
  })

  React.useEffect(() => {
    if (!props.logs.requestSuccessful) {
      props.getLogs()
    }
    props.logs.logs &&
      setTableData(
        props.logs.logs.slice(skipElements, elementsPerPage * (tablePage + 1)),
      )
    props.logs.logs && setElementsCount(props.logs.logs.length)
  }, [props.logs && props.logs.logs])

  const handleChangePage = (_, page) => {
    setTableData(
      props.logs.logs
        .filter(
          el =>
            (activeFiltering.warning === true && el.logLevel === 'Warning') ||
            (activeFiltering.error === true && el.logLevel === 'Error') ||
            (activeFiltering.fatal === true && el.logLevel === 'Fatal'),
        )
        .slice(elementsPerPage * page, elementsPerPage * (page + 1)),
    )
    setSkipElements(elementsPerPage * tablePage)
    setTablePage(page)
  }
  const handleChangeRowsPerPage = e => {
    setTableData(
      props.logs.logs
        .filter(
          el =>
            (activeFiltering.warning === true && el.logLevel === 'Warning') ||
            (activeFiltering.error === true && el.logLevel === 'Error') ||
            (activeFiltering.fatal === true && el.logLevel === 'Fatal'),
        )
        .slice(skipElements, e.target.value * (tablePage + 1)),
    )
    setElementsPerPage(e.target.value)
  }
  const renderTableBody = () => {
    if (!tableData) return
    else {
      return (
        tableData &&
        tableData.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell component="th" scope="row">
              {row.logLevel}
            </TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.message}</TableCell>
          </TableRow>
        ))
      )
    }
  }

  const applyFilter = level => {
    let filteringObj = {}
    switch (level) {
      case 'warning':
        filteringObj = {
          ...activeFiltering,
          warning: !activeFiltering.warning,
        }
        break
      case 'error':
        filteringObj = {
          ...activeFiltering,
          error: !activeFiltering.error,
        }
        break
      case 'fatal':
        filteringObj = {
          ...activeFiltering,
          fatal: !activeFiltering.fatal,
        }
        break
    }
    setActiveFiltering(filteringObj)
    setTablePage(0)
    setSkipElements(0)

    let filtereWarningArray =
      props.logs.logs &&
      props.logs.logs.filter(
        el =>
          (filteringObj.warning === true && el.logLevel === 'Warning') ||
          (filteringObj.error === true && el.logLevel === 'Error') ||
          (filteringObj.fatal === true && el.logLevel === 'Fatal'),
      )
    if (filtereWarningArray.length === 0) {
      filtereWarningArray = props.logs.logs
    }
    setElementsCount(filtereWarningArray.length)
    setTableData(
      filtereWarningArray.slice(
        skipElements,
        elementsPerPage * (tablePage + 1),
      ),
    )
  }

  return (
    <React.Fragment>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.filterArea}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeFiltering.warning}
                    name="warningChx"
                    onChange={() => applyFilter('warning')}
                  />
                }
                label="Warning"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeFiltering.error}
                    name="errorChx"
                    onChange={() => applyFilter('error')}
                  />
                }
                label="Error"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeFiltering.fatal}
                    name="fatalChx"
                    onChange={() => applyFilter('fatal')}
                  />
                }
                label="Fatal"
              />
            </FormGroup>
            {/* <Button
              variant="contained"
              className={`${classes.filterButton} ${classes.warningFilterButton}`}
              onClick={() => filterBy('warning')}
            >
              Warning Logs
            </Button>
            <Button
              variant="contained"
              className={`${classes.filterButton} ${classes.errorFilterButton}`}
              onClick={() => filterBy('error')}
            >
              Error Logs
            </Button>
            <Button
              variant="contained"
              className={`${classes.filterButton} ${classes.fatalFilterButton}`}
              onClick={() => filterBy('fatal')}
            >
              Fatal Logs
            </Button> */}
            {/* <form className={classes.filterSearchBox}>
              <TextField id="standard-basic" label="Search" />
              <IconButton className={classes.iconButton} aria-label="menu">
                <SearchIcon />
              </IconButton>
            </form> */}
          </Paper>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ErrorLevel</TableCell>
                  <TableCell>TimeStamp</TableCell>
                  <TableCell>Mesaj</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderTableBody()}</TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={elementsCount}
                    rowsPerPage={elementsPerPage}
                    page={tablePage}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </React.Fragment>
  )
}

export default connect(({ logs }) => ({ logs }), {
  getLogs,
})(Logs)
