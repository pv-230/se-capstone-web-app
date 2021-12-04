import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Typography, Card, Stack, Slider, Button, Divider, Paper, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState, useEffect } from "react"
import { getUserData } from "../APIs/getUserData"
import { ClassInfo } from "../models/ClassInfo"
import { useHistory } from 'react-router-dom'

const CourseRecommendation = () => {

  const history = useHistory();
  let courseInfo = new ClassInfo();

  let [buttonClicked, setButtonClicked] = useState(false);
  const [takenCourses, setTakenCourses] = useState(null);
  const [sliderVal, setSliderVal] = useState(1);

  const setCourses = (courses) => {
    setTakenCourses(courses.completedClasses)
  }

  const generateCourses = () => {
    let courses = [];
    let counter = 0;

    for (let i = 0; i < courseInfo.classMapNames.length; i++) {
      // FIX LOOP
      if (counter >= sliderVal) {
        return courses
      }
      else {
        let newClass = courseInfo.classMapCodes[i]
        if (!takenCourses.includes(courseInfo.classMapCodes[i])) {
          // Checks for prereqs
          if (newClass === 'Foreign Language II' && !takenCourses.includes('Foreign Language I')) { }
          else if (newClass === 'Foreign Language III' && !takenCourses.includes('Foreign Language II')) { }
          else if (newClass === 'MAC 1140' && !takenCourses.includes('MAC 1105')) { }
          else if (newClass === 'MAC 1114' && !takenCourses.includes('MAC 1105')) { }
          else if (newClass === 'MAC 2311' && !takenCourses.includes('MAC 1114') && !takenCourses.includes('MAC 1140')) { }
          else if (newClass === 'MAC 2312' && !takenCourses.includes('MAC 2311')) { }
          else if (newClass === 'MAD 2104' && !takenCourses.includes('MAC 2311')) { }
          else if (newClass === 'STA 4442' && !takenCourses.includes('MAC 2312')) { }
          else if (newClass === 'MAD 3105' && !takenCourses.includes('MAD 2104')) { }
          else if (newClass === 'COP 3363' && !takenCourses.includes('MAC 1140')) { }
          else if (newClass === 'CIS 3250' && !takenCourses.includes('COP 3363')) { }
          else if (newClass === 'COP 3330' && !takenCourses.includes('COP 3363')) { }
          else if (newClass === 'CDA 3100' && !takenCourses.includes('COP 3363')) { }
          else if (newClass === 'COT 4420' && !takenCourses.includes('MAD 3105')) { }
          else if (newClass === 'COP 4530' && !takenCourses.includes('COP 3330') && !takenCourses.includes('MAD 2104')) { }
          else if (newClass === 'CEN 4020' && !takenCourses.includes('COP 4530')) { }
          else if (newClass === 'CEN 4090L' && !takenCourses.includes('COP 4530')) { }
          else if (newClass === 'COP 4521' && !takenCourses.includes('COP 4530')) { }
          else if (newClass === 'COP 4610' && !takenCourses.includes('COP 4530')) { }
          else if (newClass === 'PHY 2048C' && !takenCourses.includes('MAC 2311') ) { }
          else if (newClass === 'PHY 2049C' && !takenCourses.includes('PHY 2048C') ) { }
          else {
            if ((courseInfo.classMapCodes[i].includes('I') || courseInfo.classMapCodes[i].includes('X') || courseInfo.classMapCodes[i] === 'CS 4xxx or Advanced Math Elective') && (courseInfo.classMapCodes[i] !== 'CIS 3250'))
              if(newClass.includes("Foreign"))
                courses.push(<Typography>{courseInfo.classMapNames[i]}</Typography>)
              else
                courses.push(<Tooltip title="Please check prerequisties!"><Typography>{courseInfo.classMapNames[i]}</Typography></Tooltip>)
            else
              if((newClass === 'PHY 2048C' || newClass === 'PHY 2049C') && takenCourses.includes('CHM 1045C') && !takenCourses.includes('BSC 2010'))
                courses.push(<Typography>BSC 2010 - Biological Science I</Typography>)
              else if((newClass === 'PHY 2048C' || newClass === 'PHY 2049C') && takenCourses.includes('BSC 2010') && !takenCourses.includes('BSC 2011')) {
                console.log("TEST")
                courses.push(<Typography>BSC 2011 - Biological Science II</Typography>)
              }
              else
                courses.push(<Typography>{courseInfo.classMapCodes[i]} - {courseInfo.classMapNames[i]}</Typography>)
            counter++
          }
        }
      }
    }
    return courses;
  }

  const clicked = () => {
    setButtonClicked(true)
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(auth.currentUser.uid).then(result => { setCourses(result) })
      } else {
        // If they are logged out, redirects to login
        history.push('/login');
      }
    });
  })

  return (
    <div>
      <Card sx={{
        width: 'calc(100vw - 100px)',
        mt: 5,
      }} elevation={1}>
        <Stack spacing={2} margin={5} alignItems="center">
          <Typography variant="h4">Course Recommendations</Typography>
          <Typography>Select the number of Computer Science classes you want to take next semester</Typography>
          <Box width="600px">
            <Slider valueLabelDisplay="auto" max={6} min={1} marks onChange={(e, val) => setSliderVal(val)} />
          </Box>
          <Button variant="contained" width="a" onClick={clicked}>Get recomended Computer Science classes</Button>
          {buttonClicked && (<Paper elevation={10}>
            <Stack margin={3} divider={<Divider orientation="horizontal" flexItem />} spacing={2} alignItems="center">
              {generateCourses()}
            </Stack>
          </Paper>)}
        </Stack>
      </Card>
    </div>
  )
}

export default CourseRecommendation