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
    <Card className="add-resources-card" elevation={8}>
      <Card className="add-resources-card" elevation={4}>
        <Stack className="add-resources-stack" spacing={3}>
          <Typography variant="h2">Additional Resources</Typography>
        </Stack>
      </Card>

      <Card className="add-resources-card" elevation={4}>
        <Box m={5}>
          <Stack className="add-resources-stack" spacing={3}>
            <Typography variant="h4">Helpful Links</Typography>
            <Typography variant="h5" color="secondary" >Florida State Department of Computer Science Homepage </Typography>
            <Button variant="contained" onClick={()=> window.open("https://www.cs.fsu.edu/")}>
              Homepage
            </Button>
            <Typography variant="h5" color="secondary" >Academic Program Guide - Computer Science (BS) </Typography>
            <Button variant="contained" onClick={()=> window.open("http://undergrad1.its.fsu.edu/academic_guide/guide-display.php?program=computer-science-bs")}>
              Guide
            </Button>
            <Typography variant="h5" color="secondary" >Computer Science Flowchart: (Updated 2021) </Typography>
            <Button variant="contained" onClick={()=> window.open("https://www.cs.fsu.edu/files/2020_files/2020_CS_BS.pdf")}>
              Flowchart
            </Button>
          </Stack>
        </Box>
      </Card>
    </Card>
  );
}

AdditionalResources.propTypes = {};

export default AdditionalResources;