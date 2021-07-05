import React from 'react'
import '@progress/kendo-theme-default/dist/all.css'
import { Route, Switch } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import PageNotFound from './components/PageNotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/routes/PrivateRoute'
import Dashboard from './components/Dashboard'
import Meetings from './components/Meetings'
import Calendar from './components/Calendar'
import Requests from './components/Requests'
import Calls from './components/Calls'
import Logs from './components/Logs'
import ChatWrapper from './components/ChatWrapper'
import ForgotPassword from './components/login/forgotPassword'
import SamlLogin from './components/login/samlLogin/SamlLogin'

function App() {
  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/meetings" component={Meetings} />
        <PrivateRoute exact path="/calendar" component={Calendar} />
        <PrivateRoute exact path="/requests" component={Requests} />
        <PrivateRoute exact path="/calls" component={Calls} />
        <PrivateRoute exact path="/logs" component={Logs} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/login" component={LoginPage} />
        <Route path="/samlLogin" component={SamlLogin} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
      <ChatWrapper />
    </div>
  )
}

export default App
