import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import {Card, CardContent, TextField} from '@mui/material'


let flag = false
let bflag = false
let len = 0

const CourseFeedback = (props) => {
  const history = useHistory();

// Redirects the user to the login screen if not authenticated
useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
        props.setNavTitle('Course Feedback');
        } else {
        history.push('/login');
        }
    });
    });


  const CDA = [
    "3100",
    "3101",
    "4150"
    ];
    
    const COP = [
    "3014",
    "3252",
    "3330",
    "3353",
    "3363",
    "4020",
    "4046C",
    "4342",
    "4380",
    "4521",
    "4530",
    "4610",
    "4656",
    "4710",
    "4813"
    ];
    
    const MAD = [
    "2104",
    "3105"
    ];
    
    const CIS = [
    "3250",
    "4138",
    "4360",
    "4385",
    "4626"
    ];
    
    const CEN = [
    "4020",
    "4021",
    "4090L",
    "4681"
    ];
    
    const STA = [
    "3032", 
    "4321",
    "4442"
    ];
    
    const COT = [
    "4401",
    "4420"
    ];
    
    const CNT = [
    "4406",
    "4504",
    "4603"
    ];
    
    const CAR = [
    "4601"
    ];

    const [subject, setSubject] = React.useState('');

    const handleChange = (event) => {
      setSubject(event.target.value);
      flag = false;
    }

    const [courses, setCourses] = React.useState('');

    const handleChangecourses = (event) => {
      setCourses(event.target.value);
      flag = true;
    }

    const [name, setName] = React.useState('');
    const handleChangeName = (event) => {
      setName(event.target.value);
    };

    len = name.length;

    let courseurl = "https://fsu.evaluationkit.com/Report/Public/Results?Course=" + subject + courses;
    let bothurl = "https://fsu.evaluationkit.com/Report/Public/Results?Course=" + subject + courses + "&Instructor=" + name.split(' ').join('+');
    let profurl = "https://fsu.evaluationkit.com/Report/Public/Results?Instructor=" + name.split(' ').join('+');

    var aja = null;
    let courseS = "";

    if (subject === "CDA") {
        aja = CDA;
      } else if (subject === "COP") {
        aja = COP;
      } else if (subject === "MAD") {
        aja = MAD;
      } else if (subject === "CIS") {
        aja = CIS;
      } else if (subject === "CEN") {
        aja = CEN;
      } else if (subject === "STA") {
        aja = STA;
      } else if (subject === "COT") {
        aja = COT;
      } else if (subject === "CNT") {
        aja = CNT;
      } else if (subject === "CAP") {
        aja = CAR;
      }

    if(aja) {
    courseS = aja.map((el) => <MenuItem key={el} value={el}>{el}</MenuItem>);
    }

    if(name.length >= 7 && flag){
        bflag = true
    } else bflag = false;

  return (

    <Box
    sx={{
      display: 'flex',
      minHeight: `calc(100vh - 65px)`,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
    >
    <Card sx={{
        width: 'calc(75vw - 600px)',
        padding: '2%',
      }} elevation={1}>

          <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
        <Typography gutterBottom variant="h4" component="div" sx={{mb: 5}}>
          Insert Course And/Or Professor
        </Typography>
        <div>
            <FormControl sx={{ width: 150, m: 1}}>
                <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                <Select
                label="Subject"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subject}
                onChange={handleChange}
                >
                    <MenuItem value={"COP"}>COP</MenuItem>
                    <MenuItem value={"MAD"}>MAD</MenuItem>
                    <MenuItem value={"CIS"}>CIS</MenuItem>
                    <MenuItem value={"CDA"}>CDA</MenuItem>
                    <MenuItem value={"CEN"}>CEN</MenuItem>
                    <MenuItem value={"STA"}>STA</MenuItem>
                    <MenuItem value={"COT"}>COT</MenuItem>
                    <MenuItem value={"CNT"}>CNT</MenuItem>
                    <MenuItem value={"CAP"}>CAP</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ width: 150, m: 1}}>
                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                label="Course"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courses}
                onChange={handleChangecourses}
                >
                    {courseS}
                </Select>
            </FormControl>

            <FormControl sx={{m: 1, ml:5, minWidth: 400}}>
            <TextField
            id="outlined-name"
            label="Name-Lastname"
            value={name}
            onChange={handleChangeName}
            />
            </FormControl>
        </div>

          <span>
          <Typography gutterBottom variant="h6" component="div" sx={{mt: 5, mb:2}}>
          Search:
        </Typography>
              </span>
        <span>
            <Button disabled={flag === false} href={courseurl} target="_blank" rel="noopener noreferrer" variant="contained" sx={{mr: 3, width: 125}}>Course</Button>
            <Button disabled={bflag === false} href={bothurl} target="_blank" rel="noopener noreferrer" variant="contained" sx={{width: 125}}>Both</Button>
            <Button disabled={(len < 7)} href={profurl} target="_blank" rel="noopener noreferrer" variant="contained" sx={{ml: 3, width: 125}}>Professor</Button>
        </span>
        </CardContent>
    </Card>
    </Box>
    
  )
}

export default CourseFeedback
