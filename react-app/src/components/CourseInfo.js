import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const CourseInfo = (props) => {
  const history = useHistory();

  const coreCoursesList = [
    'Discrete Math I', 'Discrete Math II', 'Computer Organization I',
    'Software Engineering I', 'Software Engineering Capstone', 'Intro to Programming',
    'DS, Algos, and GP I', 'DS, Algos, and GP II', 'SP&D Computing in Python',
    'Operating Systems', 'Theory of Computation', 'Statistics', 'Ethics and Computer Science'
  ]

  const electivesList = [
    'Intro to Artificial Intelligence', 'Computer Organization II',
    'Software Engineering II', 'Expert Systems', 'Intro to Software Reverse Engineering',
    'Computer Security Fundamentals', 'Cybercrime Detection and Forensics',
    'Intro to Offensive Computer Security', 'Network Security and Cryptography',
    'Intro to Computer Networks', 'Computer and Network System Administration',
    'Advanced Programming with Java', 'Programming Languages', 'Python Programming',
    'Advanced Application Developerment', 'Unix Tools', 'Reactive Systems Programming',
    'Intro to Compiler Writing', 'Mobile Programming', 'Theory and Structure of Databases',
    'Web Applications Programming', 'Top 10 Algorithms', 'Computer Architecture'
  ]

  const [info, setInfo] = useState('Please select a course on the left');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        props.setNavTitle('Course Information');
      } else {
        history.push('/login');
      }
    });
  });

  const handleSelection = text => {
    setInfo(text);
  }

  return (
    <>
      {props.navTitle ? (
        <>
          <Drawer
            PaperProps={{
              sx: {
                width: 350,
              }
            }}
            variant="permanent"
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h5">Required Courses</Typography>
                  </ListItemText>
                </ListItem>
                {coreCoursesList.sort().map((text) => (
                  <ListItem button key={text} onClick={() => handleSelection(text)}>
                    <ListItemText secondary={text} />
                  </ListItem>
                ))}
                <Divider />
                <ListItem>
                  <ListItemText>
                    <Typography variant="h5">Electives</Typography>
                  </ListItemText>
                </ListItem>
                {electivesList.sort().map((text) => (
                  <ListItem button key={text} onClick={() => handleSelection(text)}>
                    <ListItemText secondary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'relative',
              left: 350,
              height: 'calc(100vh - 65px)',
              width: 'calc(100vw - 350px)',
            }}
          >

            <p>{info}</p>
          </Box>
        </>
      ) : (
        null
      )}
    </>
  )
}

export default CourseInfo
