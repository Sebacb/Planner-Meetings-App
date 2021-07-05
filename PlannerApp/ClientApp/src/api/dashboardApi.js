import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function getUserDashboardInfo(userId) {
  return client({ url: `users/getUserDashboardInfo?userId=${userId}`, method: 'GET' })
    .then(handleResponse)
    .catch(handleError)
}
