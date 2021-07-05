import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function getLogs() {
  return client({ url: `logs/getLogs`, method: 'GET' })
    .then(handleResponse)
    .catch(handleError)
}
