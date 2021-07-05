import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { getAppBaseUrl } from '../../../configs/environment'
import './styles.css'

const ForgotPassword = props => {
  const [message, setMessage] = React.useState(undefined)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    const username = form.username.value
    axios
      .post(`${getAppBaseUrl()}/users/forgotpassword`, { username: username })
      .then(res => setMessage(res.data))
  }

  const renderErrorMessage = () => {
    if (message === undefined) {
      return <React.Fragment></React.Fragment>
    } else {
      if (message) {
        return (
          <div className="successReset">
            Cererea de resetare a fost inregistrata cu success. Apasa{' '}
            <Link href="/login">aici</Link> pentru a reveni la pagina
            principala.
          </div>
        )
      } else {
        return <div className="failedReset">Acest username nu exista.</div>
      }
    }
  }
  return (
    <React.Fragment>
      <div className="container-flex">
        <Paper className="forgot-paper-container">
          <h3>Ai uitat parola?</h3>
          <p>Administratorul va reseta parola contului dumneavoastra.</p>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel htmlFor="component-simple">Username</InputLabel>
              <Input id="username" />
            </FormControl>
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="resetPasswordButton"
              // disabled={password.length > 0 && username.length > 0}
            >
              Resetare parola
            </Button>
          </form>
          {renderErrorMessage()}
        </Paper>
      </div>
    </React.Fragment>
  )
}

export default ForgotPassword
