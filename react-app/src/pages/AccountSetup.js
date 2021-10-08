import React from 'react'
import CardButton from '../components/CardButton'
import { Stack, Grid, Card, Box, Typography, Button } from '@mui/material'

let selectedClasses = [];

const stackStyle = {
  alignItems: 'center',
  justifyContent: 'center'
}

var typographyStyle = {
  "fontFamily": `"Segoe UI", "sans-serif"`,
  "fontSize": 35,
  "fontWeight": 700,
}

const AccountSetup = () => {
  return (
    <Card>
      <Box m={5}>
        <Stack spacing={3} style={stackStyle}>
          <Typography style={typographyStyle}>Pick your completed class here and stuff</Typography>
          <Grid container justifyContent="space-evenly" rowSpacing={2}>
            <Grid item>
              <CardButton classCode="COP3363" className="Intro to Programming" update={updateClicked}/>
            </Grid>
            <Grid item>
              <CardButton classCode="CDA3100" className="Comp Org" update={updateClicked}/>
            </Grid>
          </Grid>
          <Button variant="contained">Submit</Button>
        </Stack>
      </Box>
    </Card>
  )
}

function updateClicked(classCode) {
  let pos = selectedClasses.indexOf(classCode);
  if(pos === -1)
    selectedClasses.push(classCode);
  else
    selectedClasses.splice(pos, 1);
}

export default AccountSetup