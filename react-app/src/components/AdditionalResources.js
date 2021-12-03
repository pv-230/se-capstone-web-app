import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Stack, Card, Box, Typography, Button } from '@mui/material'
import '../styles/AdditionalResources.css'
/**
  * @param {setNavTitle} props
*/

const AdditionalResources = (props) => {
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        props.setNavTitle('Additional Resources');
      } else {
        history.push('/login');
      }
    });
  });

  return (
      <Card sx={{height: '90vh'}} elevation={4}>
        <Box m={5}>
          <Stack className="add-resources-stack" spacing={3}>
            <Typography variant="h2" marginTop={4}>Additional Resources</Typography>
            <Typography variant="h4">Helpful Links</Typography>
            <Button variant="text" onClick={()=> window.open("https://www.cs.fsu.edu/")}>
              <Typography variant="h5" color="secondary" >Florida State Department of Computer Science Homepage </Typography>
            </Button>
            <Button variant="text" onClick={()=> window.open("http://undergrad1.its.fsu.edu/academic_guide/guide-display.php?program=computer-science-bs")}>
              <Typography variant="h5" color="secondary" >Academic Program Guide - Computer Science (BS) </Typography>
            </Button>
            <Button variant="text" onClick={()=> window.open("https://www.cs.fsu.edu/files/2020_files/2020_CS_BS.pdf")}>
              <Typography variant="h5" color="secondary" >Computer Science Flowchart: (Updated 2021) </Typography>
            </Button>
          </Stack>
          <Stack spacing={5} className="add-resources-stack">
            <Typography variant="h4">Contact Information</Typography>
            <Stack width="300px">
              <Typography variant="h6">Amy Sanderson</Typography>
              <Typography variant="h7">Advising First Academic Advisor</Typography>
              <Typography variant="h7">Academic Advisor for Computer Science</Typography>
              <Typography variant="h7">Phone: (850) 644-3768</Typography>
              <Typography variant="h7">Email: aesanderson@fsu.dot.edu</Typography>
            </Stack>
            <Stack width="300px">
              <Typography variant="h6">Lauren Higbee</Typography>
              <Typography variant="h7">Academic Program Specialist</Typography>
              <Typography variant="h7">Junior/Senior Academic Advisor for Computer Science</Typography>
              <Typography variant="h7">Phone: (850) 644-8700</Typography>
              <Typography variant="h7">Email: lhigbee@fsu.dot.edu</Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>
  );
}

AdditionalResources.propTypes = {};

export default AdditionalResources;