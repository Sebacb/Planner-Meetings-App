import client from '../configs/client'
import { handleResponse, handleError } from './apiUtils'

export function getWeekMeetings(userId) {
  return client({
    url: `meeting/getWeekMeetings?userId=${userId}`,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)
}

export function getMeetingInfo(userId) {
  return client({
    url: `meeting/getMeetingInfo?userId=${userId}`,
    method: 'GET',
  })
    .then(handleResponse)
    .catch(handleError)
}

export function createMeeting(dto) {
  return client({
    url: 'meeting/createMeeting',
    method: 'POST',
    data: dto,
  })
    .then(handleResponse)
    .catch(handleError)
}


export function deleteMeeting(dto){
  return client({
    url: 'meeting/deleteMeeting',
    method: 'POST',
    data: dto,
  })
    .then(handleResponse)
    .catch(handleError)
}

export function changeMeetingStatus(dto){
  return client({
    url: 'meeting/changeMeetingStatus',
    method: 'POST',
    data: dto,
  })
    .then(handleResponse)
    .catch(handleError)
}