import React from 'react'
import Register from '../components/Register'

/*
 * This is the page that houses all components needed to allow a user to register.
 */
const RegisterPage = (props) => {
  return (
    <div>
      <Register setUserProp={props.setUserProp} />
    </div>
  )
}

export default RegisterPage