import { combineReducers } from 'redux'

// Imports: Reducers
import user from './userReducer'
import dashboard from './dashboardReducer'
import meetings from './meetingReducer'
import apiCallsInProgress from './apiStatusReducer'
import responsibles from './responsiblesReducer'
import team from './teamReducer'
import logs from './logsReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
  user,
  dashboard,
  meetings,
  responsibles,
  team,
  logs,
  apiCallsInProgress,
})

export default rootReducer
