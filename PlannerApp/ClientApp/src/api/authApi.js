import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function login(credentials) {
  return client({
    url: 'users/authenticate',
    method: 'POST',
    data: credentials,
  })
    .then(handleResponse)
    .catch(handleError)
}

export function samlLogin(query) {
  return client({
    url: `users/authSaml${query}`,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)
}

export function logout() {
  return client({ url: 'users/logout', method: 'GET' })
    .then(handleResponse)
    .catch(handleError)
}

export function getNotifications(userId) {
  return client({
    url: `users/getNotificatications?userId=${userId}`,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)
}

export function deleteNotification(id) {
  return client({
    url: `users/deleteNotification`,
    method: 'POST',
    data: { notificationId: id },
  })
    .then(handleResponse)
    .catch(handleError)
}

export function deleteAllNotifications(userId) {
  return client({
    url: `users/deleteAllNotifications`,
    method: 'POST',
    data: { userId: userId },
  })
    .then(handleResponse)
    .catch(handleError)
}
