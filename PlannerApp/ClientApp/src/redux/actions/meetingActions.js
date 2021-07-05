import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as meetingsApi from '../../api/meetingApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function getWeekMeetings(userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return meetingsApi
      .getWeekMeetings(userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.MEETING_GET_WEEK_MEETINGS, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function getMeetingInfo(userId){
    return function(dispatch) {
        dispatch(beginApiCall())
        return meetingsApi
          .getMeetingInfo(userId)
          .then(data => {
            dispatch(apiTypeCallSuccess(types.GET_MEETING_INFO, data))
          })
          .catch(error => {
            dispatch(apiCallError(error))
            throw error
          })
      }
}

export function createMeeting(obj){
  return function(dispatch) {
    dispatch(beginApiCall())
    return meetingsApi
      .createMeeting(obj)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.CREATE_MEETING, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function deleteMeeting(dto){
  return function(dispatch) {
    dispatch(beginApiCall())
    return meetingsApi
      .deleteMeeting(dto)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.DELETE_MEETING, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function confirmMeeting(dto){
  return function(dispatch) {
    dispatch(beginApiCall())
    return meetingsApi
      .changeMeetingStatus({...dto, confirm: true})
      .then(data => {
        dispatch(apiTypeCallSuccess(types.CONFIRM_MEETING, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function declineMeeting(dto){
  return function(dispatch) {
    dispatch(beginApiCall())
    return meetingsApi
      .changeMeetingStatus({...dto, confirm: false})
      .then(data => {
        dispatch(apiTypeCallSuccess(types.DECLINE_MEETING, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
