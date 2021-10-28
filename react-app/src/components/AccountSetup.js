import React from 'react'
import { useEffect } from 'react'
import CourseSelection from './CourseSelection'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import '../styles/AccountSetup.css'

let auth = null;

const AccountSetup = () => {

  useEffect(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
      } else {
        // If they are logged out, redirects to login
        window.location.href = '/login';
      }
    });
  }, [])

  return (
    <div>
      <CourseSelection showName={true}></CourseSelection>
    </div>
  )
}

export default AccountSetup