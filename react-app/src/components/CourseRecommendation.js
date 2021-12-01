import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Typography, Card, Stack, Slider, Button, Divider, Paper } from "@mui/material"
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

    for(let i = 0; i < courseInfo.classMapNames.length; i++) {
      if(counter >= sliderVal) {
        return courses
      }
      else {
        if(!takenCourses.includes(courseInfo.classMapCodes[i])) {
          if(courseInfo.classMapCodes[i].includes('I') || courseInfo.classMapCodes[i].includes('X'))
          courses.push(<Typography>{courseInfo.classMapNames[i]}</Typography>)
          else
            courses.push(<Typography>{courseInfo.classMapCodes[i]} - {courseInfo.classMapNames[i]}</Typography>)
          counter++
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
        getUserData(auth.currentUser.uid).then(result => {setCourses(result)})
      } else {
        // If they are logged out, redirects to login
        history.push('/login');
      }
    });
  }, [])

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