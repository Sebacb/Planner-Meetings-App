import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function logs(state = initialState.logs, action = {}) {
  switch (action.type) {
    case types.GET_LOGS:
      return { logs: action.payload, requestSuccessful: true }
    default:
      return state
  }
}
