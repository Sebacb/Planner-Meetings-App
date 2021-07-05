import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './redux/store'
import Moment from 'moment'

import './index.css'
import 'moment/locale/ro'

import { setDefaultLocale } from 'react-datepicker'
import ro from 'date-fns/locale/ro'

import App from './App'

setDefaultLocale(ro)

Moment.locale('ro')

ReactDOM.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </ReduxProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
