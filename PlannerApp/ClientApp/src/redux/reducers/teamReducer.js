import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function team(state = initialState.team, action = {}) {
  switch (action.type) {
    case types.TEAM_GET_INFO:
      return { ...action.payload }
    default:
      return state
  }
}
