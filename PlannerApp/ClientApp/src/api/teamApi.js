import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function getTeamInfo(teamId) {
  return client({ url: `team/getTeamInfo?teamId=${teamId}`, method: 'GET' })
    .then(handleResponse)
    .catch(handleError)
}
