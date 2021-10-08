import React from 'react'
import CardButton from '../components/CardButton'
import { Stack } from '@mui/material'

let selectedClasses = [];

const AccountSetup = () => {
  return (
    <Stack>
      <h1>Pick your completed class here and stuff</h1>
      <CardButton classCode="COP3363" className="Intro to Programming" update={updateClicked}/>
      <CardButton classCode="CDA3100" className="Comp Org" update={updateClicked}/>
    </Stack>
  )
}

function updateClicked(classCode) {
  let pos = selectedClasses.indexOf(classCode);
  if(pos == -1)
    selectedClasses.push(classCode);
  else
    selectedClasses.splice(pos, 1);
  console.log(selectedClasses);
}

export default AccountSetup