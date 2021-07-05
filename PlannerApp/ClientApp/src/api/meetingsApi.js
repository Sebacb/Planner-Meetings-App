import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function getMeetings(userId) {
  return client({ url: `meeting/getAll?userId=${userId}`, method: 'GET' })
    .then(handleResponse)
    .catch(handleError)
}
