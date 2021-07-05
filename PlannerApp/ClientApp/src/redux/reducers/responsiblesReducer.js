import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function responsibles(state = initialState.responsibles, action = {}) {
  switch (action.type) {
    case types.USER_GET_RESPONSIBLES:
      return action.payload
    default:
      return state
  }
}
