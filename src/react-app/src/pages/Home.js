import React from 'react'

/*
 * This is the page that houses all components needed in the home page.
 */
const Home = (props) => {
  if (props.uidProp !== null) {
    return <h1 >Home Page</h1>
  } else {
    window.location.href = '/login'
    return <></>
  }
}

export default Home