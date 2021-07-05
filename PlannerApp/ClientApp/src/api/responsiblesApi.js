import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function getResponsibles(userId) {
  return client({ url: `responsibles/getResponsibles?userId=${userId}`, method: 'GET' })
    .then(handleResponse)
    .catch(handleError)
}
