import axios from 'axios'
import { getAppBaseUrl } from './environment'
import { store } from '../redux/store';
import * as types from '../redux/actions/actionTypes'

const client = axios.create({
  baseURL: getAppBaseUrl(),
  timeout: 90000,
  headers: { Accept: 'application/json' },
})

client.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error?.response?.status === 401) {
    store.dispatch({
      type: types.UNAUTHORIZED,
      payload: error,
    })
  }
  return Promise.reject(error);
});

export const setAuthorizationHeader = token => {
  if (token) {
    client.defaults.headers.common.authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.authorization
  }
}

export default client
