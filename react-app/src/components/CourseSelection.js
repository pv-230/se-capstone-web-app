import React, { useEffect } from "react"
import { Container, Card, Stack, Button, CardContent, Snackbar, Alert, Typography, Backdrop, CircularProgress } from "@mui/material"
import '../styles/CourseSelection.css'
import CourseButton from "./CourseButton"
import { useState } from "react"
import { ClassInfo } from '../models/ClassInfo'
import { getUserData } from "../APIs/getUserData"
import { setUserData } from "../APIs/setUserData"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UserData } from "../models/UserData"

const CourseSelection = () => {

  // States to keep track of what courses are selected/disabled
  const [select, setSelect] = useState(Array(35).fill(false));
  const [disable, setDisable] = useState([false].concat(Array(17).fill(true))
    .concat([false, true, true]).concat([true, false, true]).concat(Array(2).fill(true)
    .concat([false, false, true]).concat(Array(3).fill(false).concat(Array(3).fill(true)))));

  let classInfo = new ClassInfo();
  const [selectedClasses, setSelectedClasses] = useState(Array(0));
  const [notSelectedClasses, setNotSelectedClasses] = useState(classInfo.classCodes)

  const [open, setOpen] = React.useState(false);
  const [loadingOpen, setLoadingOpen] = React.useState(true);

  let auth = null;

  const showCoreq = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function updateClicked(classCode, id) {
    toggleSelect(id);
    let pos = selectedClasses.indexOf(classCode);
    let nsPos = notSelectedClasses.indexOf(classCode);

    if (pos === -1) {
      selectedClasses.push(classCode);
      notSelectedClasses.splice(nsPos, 1);

      // Enabling button logic
      if (classCode === "MAC 1105")
        enable([1, 4, 21]);
      else if (classCode === "MAC 1114") {
        if (select[4])
          enable([5]);
      }
      else if (classCode === "MAC 1140") {
        if (select[1])
          enable([5]);
        enable([8]);
      }
      else if (classCode === "MAC 2311")
        enable([2, 6, 24]);
      else if (classCode === "MAC 2312")
        enable([3]);
      else if (classCode === "MAD 2104")
        enable([7]);
      else if (classCode === "MAD 3105")
        enable([12]);

      else if (classCode === "BSC 2010")
        enable([23]);
      else if (classCode === "PHY 2048C")
        enable([25]);

      else if (classCode === "COP 3363")
        enable([9, 10, 11]);
      else if (classCode === "COP 3330") {
        enable([13]);
        showCoreq();
      }
      else if (classCode === "CDA 3100") {
        if (select[13])
          enable([17]);
        showCoreq();
      }
      else if (classCode === "COP 4530") {
        if (select[11])
          enable([14, 15, 16, 17]);
        else
          enable([14, 15, 16])
      }

      else if (classCode === "Foreign Language I")
        enable([19]);
      else if (classCode === "Foreign Language II")
        enable([20]);

      else if(classCode === 'CXX 3xxx or 4xxx I')
        enable([28]);
      else if(classCode === "CXX 4xxx I")
        enable([32]);
      else if(classCode === "CXX 4xxx II")
        enable([33]);
      else if(classCode === "CXX 4xxx III")
        enable([34]);

    }
    else {
      notSelectedClasses.push(classCode);
      selectedClasses.splice(pos, 1);

    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 50);
    });
  }

    function updateClicked(classCode, id, ) {
    toggleSelect(id);
    let pos = selectedClasses.indexOf(classCode);
    let nsPos = notSelectedClasses.indexOf(classCode);

    if (pos === -1) {
      selectedClasses.push(classCode);
      notSelectedClasses.splice(nsPos, 1);

      // Enabling button logic
      if (classCode === "MAC 1105")
        enable([1, 4, 21]);
      else if (classCode === "MAC 1114") {
        if (select[4])
          enable([5]);
      }
      else if (classCode === "MAC 1140") {
        if (select[1])
          enable([5]);
        enable([8]);
      }
      else if (classCode === "MAC 2311")
        enable([2, 6, 24]);
      else if (classCode === "MAC 2312")
        enable([3]);
      else if (classCode === "MAD 2104")
        enable([7]);
      else if (classCode === "MAD 3105")
        enable([12]);

      else if (classCode === "BSC 2010")
        enable([23]);
      else if (classCode === "PHY 2048C")
        enable([25]);

      else if (classCode === "COP 3363")
        enable([9, 10, 11]);
      else if (classCode === "COP 3330") {
        enable([13]);
        showCoreq();
      }
      else if (classCode === "CDA 3100") {
        if (select[13])
          enable([17]);
        showCoreq();
      }
      else if (classCode === "COP 4530") {
        if (select[11])
          enable([14, 15, 16, 17]);
        else
          enable([14, 15, 16])
      }

      else if (classCode === "Foreign Language I")
        enable([19]);
      else if (classCode === "Foreign Language II")
        enable([20]);

      else if(classCode === 'CXX 3xxx or 4xxx I')
        enable([28]);
      else if(classCode === "CXX 4xxx I")
        enable([32]);
      else if(classCode === "CXX 4xxx II")
        enable([33]);
      else if(classCode === "CXX 4xxx III")
        enable([34]);

    }
    else {
      notSelectedClasses.push(classCode);
      selectedClasses.splice(pos, 1);

    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 50);
    });
  }

  const test = () => {
    console.log(selectedClasses);
    console.log(notSelectedClasses);
    //console.log(langSelect);
    //console.log(disable);
    //console.log(disable.length);
  }

  const enable = (id) => {
    const newArr = [...disable];
    for (let i = 0; i < id.length; i++) {
      newArr[id[i]] = false;
    }
    setDisable(newArr);
  }

  const toggleSelect = (id) => {
    const newArr = [...select];
    newArr[id] = !newArr[id];
    setSelect(newArr);
  }

  const getData = async () => {
    const data = await getUserData(auth.currentUser.uid);
    if (data === null)
      setLoadingOpen(false);
    else {
      //console.log(data.completedClasses);
      for(let x = 0; x < classInfo.classCodes.length; x++) {
        let pos = data.completedClasses.indexOf(classInfo.classCodes[x]);
        if(pos !== -1) {
          console.log(data.completedClasses[pos] + " " + x);
          await updateClicked(data.completedClasses[pos], x);
          //console.log(selectedClasses);
        }
      }
      //for (let i = 0; i < data.completedClasses.length; i++) {
        //updateClicked(data.completedClasses[i]);
        //console.log(data.completedClasses[i]);
      //}
      setLoadingOpen(false);
    }
  }

  const saveData = async () => {
    // Creates and send their data to the database
    console.log(auth.currentUser);
    const email = auth.currentUser.email;
    let userD = new UserData(
      "TEST",
      "TEST",
      email,
      selectedClasses,
      notSelectedClasses
    );
    await setUserData(userD, auth.currentUser.uid);
    window.location.href = '/';
  }

  useEffect(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        getData();
      } else {
        // If they are logged out, redirects to login
        window.location.href = '/login';
      }
    });
  }, [])

  return (
    <Card className="crs-select-card" elevation={8}>
      <Backdrop open={loadingOpen} style={{ zIndex: 2 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <CardContent>
        <Button variant="contained" onClick={test}>Show Selected</Button>
        <Typography padding={3} variant="h4">Select your completed and current classes</Typography>
        <Stack className="crs-select-stack" direction="row" justifyContent="center">
          <Stack className="crs-select-stack" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Card style={{ minWidth: '1310px' }} elevation={10}>
                <CardContent>
                  <Stack spacing={2} direction="row">
                    <Stack spacing={2} direction="row">
                      <Stack spacing={2}>
                        <CourseButton courseCode='MAC 1105' courseName='College Algebra' id={0} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='MAC 1114' courseName='Trigonometry' id={1} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='MAC 2312' courseName='Calculus II' id={2} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='STA 4442' courseName='Intro to Probability' id={3} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Stack>
                      <Stack spacing={2}>
                        <CourseButton courseCode='MAC 1140' courseName='Precalculus' id={4} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='MAC 2311' courseName='Calculus I' id={5} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='MAD 2104' courseName='Discrete Math I' id={6} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='MAD 3105' courseName='Discrete Math II' id={7} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Stack>
                    </Stack>

                    <Stack spacing={2}>
                      <Container>
                        <CourseButton courseCode='COP 3363' courseName='Programming I in Unix' id={8} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Container>

                      <Container>
                        <Stack spacing={2} alignItems="center">
                          <Stack spacing={2} direction="row">
                            <CourseButton courseCode='CIS 3250' courseName='Ethics and CS' id={9} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                            <CourseButton courseCode='COP 3330' courseName='Object-Oriented Programming' id={10} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                            <CourseButton courseCode='CDA 3100' courseName='Computer Organization I' id={11} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          </Stack>
                          <Stack spacing={2} direction="row" justifyContent="flex-start">
                            <CourseButton courseCode='COT 4420' courseName='Theory of Computation' id={12} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                            <CourseButton courseCode='COP 4530' courseName='Data Struc, Algs and Gen Program' id={13} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          </Stack>
                        </Stack>
                      </Container>
                      <Stack spacing={2} direction="row">
                        <CourseButton courseCode='CEN 4020' courseName='Software Engineering' id={14} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='CEN 4020L' courseName='SE Capstone' id={15} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='COP 4521' courseName='Secure, Parallel and Dist. Python' id={16} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='COP 4610' courseName='Op Sys and Conc Progr' id={17} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
              <Card style={{ height: '290px', minWidth: '230px' }} elevation={10}>
                <CardContent>
                  <Stack spacing={2}>
                    <CourseButton courseCode='Foreign Language I' courseName='' id={18} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                    <CourseButton courseCode='Foreign Language II' courseName='' id={19} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                    <CourseButton courseCode='Foreign Language III' courseName='' id={20} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>

            <Stack spacing={2} direction="row">
              <Stack spacing={2} alignItems="center">
                <Stack spacing={2} direction="row">
                  <Card elevation={10}>
                    <CardContent>
                      <Stack spacing={2}>
                        <CourseButton courseCode='CHM 1045C' courseName='Gen Chem I w/lab' id={21} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='BSC 2010' courseName='Bio Sci I' id={22} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='BSC 2011' courseName='Bio Sci II' id={23} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Card style={{ height: '206px' }} elevation={10}>
                    <CardContent>
                      <Stack spacing={2}>
                        <CourseButton courseCode='PHY 2048C' courseName='Gen Physics I w/lab' id={24} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='PHY 2049C' courseName='Gen Physics II w/lab' id={25} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
                <Card style={{ height: '105px' }} elevation={10}>
                  <CardContent>
                    <CourseButton courseCode='XXX xxxx' courseName='Science for Majors' id={26} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                  </CardContent>
                </Card>
              </Stack>

              <Stack spacing={2}>
                <Card elevation={10}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack spacing={2} direction="row">
                        <CourseButton courseCode='CXX 3xxx or 4xxx I' courseName='Elective' id={27} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='CXX 3xxx or 4xxx II' courseName='Elective' id={28} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='CIS 4900 or CXX 3xxx' courseName='' id={29} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='CS 4xxx or Advanced Math Elective' courseName='' id={30} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Stack>
                      <Stack spacing={2} direction="row">
                        <CourseButton courseCode='CXX 4xxx I' courseName='Upper Division Elective' id={31} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='CXX 4xxx II' courseName='Upper Division Elective' id={32} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='CXX 4xxx III' courseName='Upper Division Elective' id={33} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        <CourseButton courseCode='CXX 4xxx IV' courseName='Upper Division Elective' id={34} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Button variant="contained" onClick={saveData}>Save</Button>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }} >
            Please note that COP 3330 and CDA 3100 are corequisites!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  )
}

export default CourseSelection