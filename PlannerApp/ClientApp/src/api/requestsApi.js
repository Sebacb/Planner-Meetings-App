import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function getRequests(userId) {
  return client({ url: `requests/getRequests?userId=${userId}`, method: 'GET' })
    .then(handleResponse)
    .catch(handleError)
}

export function insert(model, userId) {
  return client({
    url: `requests/insert/${userId}`,
    method: 'POST',
    data: model,
  })
    .then(handleResponse)
    .catch(handleError)
}
