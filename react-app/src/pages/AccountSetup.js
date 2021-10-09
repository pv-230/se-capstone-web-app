import React from 'react'
import CardButton from '../components/CardButton'
import { Stack, Grid, Card, Box, Typography, Button } from '@mui/material'
import { ClassInfo } from '../models/ClassInfo'

let selectedClasses = [];
let classInfo = new ClassInfo();

const stackStyle = {
  alignItems: 'center',
  justifyContent: 'center'
}

var typographyStyle = {
  "fontFamily": `"Segoe UI", "sans-serif"`,
  "fontSize": 35,
  "fontWeight": 700,
}

var style = {
  display: 'block',
  width: 'auto',
  height: 'auto',
  textAlign: 'center',
  margin: '3%'
}

const AccountSetup = () => {
  return (
    <Card style={style}>
      <Box m={5}>
        <Stack spacing={3} style={stackStyle}>
          <Typography style={typographyStyle}>Pick your completed class here and stuff</Typography>
          <Grid container justifyContent="space-evenly" rowSpacing={2} spacing={2}>
            {createCards()}
          </Grid>
          <Button variant="contained">Submit</Button>
        </Stack>
      </Box>
    </Card>
  )
}

function createCards() {
  let classCards = []
  for(let i = 0; i < classInfo.classCodes.length; i++) {
      classCards.push(
      <Grid item>
        <CardButton classCode={classInfo.classCodes[i]} className={classInfo.classNames[i]} update={updateClicked}/>
      </Grid>
      );
  }
  return classCards;
}

function updateClicked(classCode) {
  let pos = selectedClasses.indexOf(classCode);
  if(pos === -1)
    selectedClasses.push(classCode);
  else
    selectedClasses.splice(pos, 1);
}

export default AccountSetup