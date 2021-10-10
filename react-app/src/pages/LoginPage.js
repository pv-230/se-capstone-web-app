import React from 'react'
import Login from '../components/Login'

/*
 * This is the page that houses all components needed to allow a user to log in.
 */
const LoginPage = (props) => {
  return (
    <Login setUserId={props.setUserId} />
  )
}

export default LoginPage