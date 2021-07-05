import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function meetings(state = initialState.meetings, action = {}) {
  switch (action.type) {
    case types.CREATE_MEETING:
    case types.GET_MEETING_INFO:
    case types.DELETE_MEETING:
    case types.CONFIRM_MEETING:
    case types.DECLINE_MEETING:
    case types.MEETING_GET_WEEK_MEETINGS:
      return { ...action.payload }
    default:
      return state
  }
}
