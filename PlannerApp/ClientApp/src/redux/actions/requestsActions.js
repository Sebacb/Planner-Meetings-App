import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as requestsApi from '../../api/requestsApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function getRequestsForUser(userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return requestsApi
      .getRequests(userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.REQUESTS_GET_FOR_USER, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function insertNewRequests(model, userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return requestsApi
      .insert(model, userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.REQUESTS_INSERT, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
