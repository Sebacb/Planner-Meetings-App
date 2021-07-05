import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as teamApi from '../../api/teamApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function getTeamInfo(teamId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return teamApi
      .getTeamInfo(teamId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.TEAM_GET_INFO, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
