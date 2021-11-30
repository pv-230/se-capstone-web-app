import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CourseDescription from './CourseDescription'

// An array of arrays that stores course codes and descriptions for core courses
const coreCourses = [
  ['CDA3100', 'Computer Organization I'],
  ['COP3330', 'Data Structures, Algos, and GP I'],
  ['COP4530', 'Data Structures, Algos, and GP II'],
  ['MAD2104', 'Discrete Mathematics I'],
  ['MAD3105', 'Discrete Mathematics II'],
  ['CIS3250', 'Ethics and Computer Science'],
  ['COP3363', 'Intro to Programming in C++'],
  ['COP4610', 'Operating Systems'],
  ['COP4521', 'SP&D Computing in Python'],
  ['CEN4090L', 'Software Engineering Capstone'],
  ['CEN4020', 'Software Engineering I'],
  ['STA3032', 'Statistics'],
  ['COT4420', 'Theory of Computation'],
]

// An array of arrays that stores course codes and descriptions for electives
const electives = [
  ['COP3252', 'Advanced Programming with Java'],
  ['CDA4150', 'Computer Architecture'],
  ['CDA3101', 'Computer Organization II'],
  ['CIS4360', 'Computer Security Fundamentals'],
  ['CNT4603', 'Computer and Network System Administration'],
  ['CIS4385', 'Cybercrime Detection and Forensics'],
  ['CEN4681', 'Expert Systems'],
  ['CAP4601', 'Intro to Artificial Intelligence'],
  ['CNT4504', 'Intro to Computer Networks'],
  ['CIS4626', 'Intro to Offensive Computer Security'],
  ['CIS4138', 'Intro to Software Reverse Engineering'],
  ['COP4656', 'Mobile Programming'],
  ['CNT4406', 'Network Security and Cryptography'],
  ['COP4020', 'Programming Languages'],
  ['COP4046C', 'Python Programming'],
  ['COP4380', 'Reactive Systems Programming'],
  ['CEN4021', 'Software Engineering II'],
  ['COP4710', 'Theory and Structure of Databases'],
  ['COT4401', 'Top 10 Algorithms'],
  ['COP4342', 'Unix Tools'],
  ['COP4813', 'Web Applications Programming'],
]

/**
 * @brief Renders a course list in a permanent drawer on the left with a card in the center that
 *        displays course information for a selected course.
 * 
 * @param {setNavTitle} props
 */
const CourseInfo = (props) => {
  const history = useHistory();

  // Contains a two element array that stores the currently selected course info
  const [cardInfo, setCardInfo] = useState([]);

  // Redirects the user to the login screen if not authenticated
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

  // Event handler for course selection
  const handleSelection = code => {
    setCardInfo(code);
  }

  return (
    <>
      {props.navTitle ? (
        <>
          <Drawer
            PaperProps={{
              sx: {
                width: 400,
              }
            }}
            variant="permanent"
          >
            {/* This toolbar helps push the list under the nav bar */}
            <Toolbar />

            {/* Course list */}
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h5">Required Courses</Typography>
                  </ListItemText>
                </ListItem>
                {coreCourses.sort((kv1, kv2) => kv1[1] - kv2[1]).map(([k, v]) => (
                  <ListItem button key={k} onClick={() => handleSelection([k, v])}>
                    <ListItemText secondary={
                      <Typography>
                        {v} ({k})
                      </Typography>
                    } />
                  </ListItem>
                ))}
                <Divider />
                <ListItem>
                  <ListItemText>
                    <Typography variant="h5">Electives</Typography>
                  </ListItemText>
                </ListItem>
                {electives.sort((kv1, kv2) => kv1[1] - kv2[1]).map(([k, v]) => (
                  <ListItem button key={k} onClick={() => handleSelection([k, v])}>
                    <ListItemText secondary={v} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Course description */}
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
            <CourseDescription cardInfo={cardInfo} />
          </Box>
        </>
      ) : (
        null
      )}
    </>
  )
}

export default CourseInfo
