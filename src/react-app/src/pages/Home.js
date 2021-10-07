import React from 'react'

/*
 * This is the page that houses all components needed in the home page.
 */
const Home = (props) => {
  if (props.uidProp === null) {
    // Attempts to visit the homepage if not logged in will redirect to the login page
    window.location.href = '/login';
    return null;
  }

  return (
    <h1>Home Page</h1>
  )
}

export default Home