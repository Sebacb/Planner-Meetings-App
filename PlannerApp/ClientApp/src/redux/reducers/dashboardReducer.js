import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function dashboard(state = initialState.dashboard, action = {}) {
  switch (action.type) {
    case types.USER_GET_DASHBOARD_INFO:
      return { ...action.payload, requestSuccessful: true }
    default:
      return state
  }
}
