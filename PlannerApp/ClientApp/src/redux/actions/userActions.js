import { beginApiCall, apiCallError } from './apiStatusActions'
import * as types from './actionTypes'
import * as authApi from '../../api/authApi'

export function apiTypeCallSuccess(callType, payload) {
  return { type: callType, payload }
}

export function loginSuccess(payload) {
  return { type: types.LOGIN_SUCCESS, payload }
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS }
}
export function failedLogin(error) {
  return { type: types.LOGIN_FAILED, error }
}

export function login(credentials) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return authApi
      .login(credentials)
      .then(data => {
        dispatch(loginSuccess(data))
      })
      .catch(error => {
        dispatch(failedLogin(error.response.data))
      })
  }
}

export function samlLogin(query) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return authApi
      .samlLogin(query)
      .then(data => {
        dispatch(loginSuccess(data))
      })
      .catch(error => {
        dispatch(failedLogin(error.response.data))
      })
  }
}

export function logout() {
  return function(dispatch) {
    dispatch(beginApiCall())
    return authApi
      .logout()
      .then(() => {
        dispatch(logoutSuccess())
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function getNotifications(userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return authApi
      .getNotifications(userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.USER_GET_NOTIFICATIONS, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function deleteNotification(id) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return authApi
      .deleteNotification(id)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.DELETE_NOTIFICATION, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}

export function deleteAllNotifications(userId) {
  return function(dispatch) {
    dispatch(beginApiCall())
    return authApi
      .deleteAllNotifications(userId)
      .then(data => {
        dispatch(apiTypeCallSuccess(types.DELETE_ALL_NOTIFICATIONS, data))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error
      })
  }
}
