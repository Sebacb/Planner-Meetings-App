import React from 'react'
import { connect } from 'react-redux'
import { samlLogin } from '../../../redux/actions/userActions'

const SamlLogin = props => {
  React.useEffect(() => {
    props.samlLogin(props.location.search).then(e => {
      props.history.replace('/')
    })
  })
  return <div></div>
}
export default connect(null, {
  samlLogin,
})(SamlLogin)
