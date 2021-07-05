import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as meetingsApi from '../../api/meetingsApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function getMeetingsForUser(userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return meetingsApi
      .getMeetings(userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.MEETINGS_GET_USER, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
