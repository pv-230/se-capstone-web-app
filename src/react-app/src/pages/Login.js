import React from 'react'
import LoginRegister from '../components/LoginRegister'

/*
 * This is the page that houses all components needed to allow a user to log in.
 */
const Login = (props) => {
  return (
    <div>
      <LoginRegister setUserProp={props.setUserProp} />
    </div>
  )
}

export default Login