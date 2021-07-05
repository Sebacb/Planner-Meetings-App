import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as responsiblesApi from '../../api/responsiblesApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function getResponsibles(userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return responsiblesApi
      .getResponsibles(userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.USER_GET_RESPONSIBLES, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
