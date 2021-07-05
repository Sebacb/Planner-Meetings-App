const DEV_URL = 'https://localhost'
const PRODUCTION_URL = 'https://www.itcompany.website.com'

const BASE_URL_DEV = DEV_URL + ':44374/api'
const BASE_URL_PRODUCTION = PRODUCTION_URL + '/api/'

export const getAppBaseUrl = () => {
  switch (process.env.REACT_APP_BUILD_FOR) {
    case 'PRODUCTION':
      return BASE_URL_PRODUCTION
    default:
      return BASE_URL_DEV
  }
}
