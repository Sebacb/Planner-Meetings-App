import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as logsApi from '../../api/logsApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function getLogs() {
  return function(dispatch) {
    dispatch(beginApiCall())
    return logsApi
      .getLogs()
      .then(data => {
        dispatch(apiTypeCallSuccess(types.GET_LOGS, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
