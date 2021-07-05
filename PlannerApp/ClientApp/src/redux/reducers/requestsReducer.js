import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function requests(state = initialState.requests, action = {}) {
  switch (action.type) {
    case types.REQUESTS_GET_FOR_USER:
      const requests = action.payload.requests
      return requests
    case types.REQUESTS_INSERT:
      const inserResponse = action.payload.requests
      return inserResponse
    default:
      return state
  }
}
