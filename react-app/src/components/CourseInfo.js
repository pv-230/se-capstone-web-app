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
  ['CDA 3100', 'Computer Organization I'],
  ['COP 3330', 'Data Structures, Algorithms, and GP I'],
  ['COP 4530', 'Data Structures, Algorithms, and GP II'],
  ['MAD 2104', 'Discrete Mathematics I'],
  ['MAD 3105', 'Discrete Mathematics II'],
  ['CIS 3250', 'Ethics and Computer Science'],
  ['COP 3363', 'Intro to Programming in C++'],
  ['COP 4610', 'Operating Systems'],
  ['COP 4521', 'SP&D Computing in Python'],
  ['CEN 4090L', 'Software Engineering Capstone'],
  ['CEN 4020', 'Software Engineering I'],
  ['STA 4442', 'Intro to Probability'],
  ['COT 4420', 'Theory of Computation'],
];

// An array of arrays that stores course codes and descriptions for alternative core courses
const altCourses = [
  ['COP 3014', 'Programming I'],
  ['COP 3353', 'Intro to UNIX'],
  ['STA 3032', 'Applied Stats for Engineers and Scientists'],
  ['STA 4321', 'Intro to Mathematical Statistics'],
];

// An array of arrays that stores course codes and descriptions for electives
const electives = [
  ['COP 3252', 'Advanced Programming with Java'],
  ['CDA 4150', 'Computer Architecture'],
  ['CDA 3101', 'Computer Organization II'],
  ['CIS 4360', 'Computer Security Fundamentals'],
  ['CNT 4603', 'Computer & Network Sys. Administration'],
  ['CIS 4385', 'Cybercrime Detection and Forensics'],
  ['CEN 4681', 'Expert Systems'],
  ['CAP 4601', 'Intro to Artificial Intelligence'],
  ['CNT 4504', 'Intro to Computer Networks'],
  ['CIS 4626', 'Intro to Offensive Computer Security'],
  ['CIS 4138', 'Intro to Software Reverse Engineering'],
  ['COP 4656', 'Mobile Programming'],
  ['CNT 4406', 'Network Security and Cryptography'],
  ['COP 4020', 'Programming Languages'],
  ['COP 4046C', 'Python Programming'],
  ['COP 4380', 'Reactive Systems Programming'],
  ['CEN 4021', 'Software Engineering II'],
  ['COP 4710', 'Theory and Structure of Databases'],
  ['COT 4401', 'Top 10 Algorithms'],
  ['COP 4342', 'Unix Tools'],
  ['COP 4813', 'Web Applications Programming'],
];

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

  // These states allow the list highlighter to color the currently selected list item
  const [reqSelected, setReqSelected] = useState(true);
  const [altSelected, setAltSelected] = useState(false);
  const [elcSelcted, selElcSelected] = useState(false);

  const [selectedItem, setSelectedItem] = useState(0)

  // Redirects the user to the login screen if not authenticated
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        props.setNavTitle('Computer Science Course Information');
      } else {
        history.push('/login');
      }
    });
  });

  // Event handler for course selection
  const handleSelection = (code, index, list) => {
    setCardInfo(code);
    setSelectedItem(index);
    
    // Sets the currently selected list
    if (list === 1) {
      setReqSelected(true);
      setAltSelected(false);
      selElcSelected(false);
    } else if (list === 2) {
      setReqSelected(false);
      setAltSelected(true);
      selElcSelected(false);
    } else if (list === 3) {
      setReqSelected(false);
      setAltSelected(false);
      selElcSelected(true);
    }
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
                {coreCourses.sort().map(([k, v], index) => (
                  <ListItem
                    button key={k}
                    onClick={() => handleSelection([k, v], index, 1)}
                    selected={(selectedItem === index) && reqSelected}
                  >
                    <ListItemText>
                      <Typography variant="body2">
                        {k} - {v}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
                <Divider sx={{ mt: 2, mb: 1 }} />
                <ListItem>
                  <ListItemText>
                    <Typography variant="h5">Alternative Courses</Typography>
                  </ListItemText>
                </ListItem>
                {altCourses.sort().map(([k, v], index) => (
                  <ListItem
                    button
                    key={k}
                    onClick={() =>handleSelection([k, v], index, 2)}
                    selected={(selectedItem === index) && altSelected}
                  >
                    <ListItemText>
                      <Typography variant="body2">
                        {k} - {v}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
                <Divider sx={{ mt: 2, mb: 1 }} />
                <ListItem>
                  <ListItemText>
                    <Typography variant="h5">Electives</Typography>
                  </ListItemText>
                </ListItem>
                {electives.sort().map(([k, v], index) => (
                  <ListItem
                    button
                    key={k}
                    onClick={() => handleSelection([k, v], index, 3)}
                    selected={(selectedItem === index) && elcSelcted}
                  >
                    <ListItemText>
                      <Typography variant="body2">
                        {k} - {v}
                      </Typography>
                    </ListItemText>
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
              left: 400,
              height: 'calc(100vh - 65px)',
              width: 'calc(100vw - 400px)',
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
