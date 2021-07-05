import * as types from '../actions/actionTypes'
import { setAuthorizationHeader } from '../../configs/client'
import initialState from './initialState'

export default function user(state = initialState.user, action = {}) {
  switch (action.type) {
    case types.USER_GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload }
    case types.LOGIN_SUCCESS:
      const user = action.payload
      setAuthorizationHeader(user.token)
      return user
    case types.LOGOUT_SUCCESS:
    case types.UNAUTHORIZED:
      setAuthorizationHeader()
      return {}
    case types.DELETE_NOTIFICATION:
    case types.DELETE_ALL_NOTIFICATIONS:
      return { ...state, notifications: [] }
    case types.LOGIN_FAILED:
      alert(action.error)
    default:
      return state
  }
}
