import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as dashboardApi from '../../api/dashboardApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function getDashboardInfo(userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return dashboardApi
      .getUserDashboardInfo(userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.USER_GET_DASHBOARD_INFO, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}


