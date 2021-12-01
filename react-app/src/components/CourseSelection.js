import React, { useEffect } from "react"
import { Container, Card, Stack, Button, CardContent, Snackbar, Alert, Typography, Backdrop, CircularProgress, TextField, Tooltip } from "@mui/material"
import '../styles/CourseSelection.css'
import CourseButton from "./CourseButton"
import { useState } from "react"
import { ClassInfo } from '../models/ClassInfo'
import { getUserData } from "../APIs/getUserData"
import { setUserData } from "../APIs/setUserData"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UserData } from "../models/UserData"
import { useHistory } from 'react-router-dom'

const CourseSelection = (props) => {
  const history = useHistory();
  // States to keep track of what courses are selected/disabled
  const [select, setSelect] = useState(Array(35).fill(false));
  const [disable, setDisable] = useState([false].concat(Array(17).fill(true))
    .concat([false, true, true]).concat([true, false, true]).concat(Array(2).fill(true)
      .concat([false, false, true]).concat(Array(3).fill(false).concat(Array(3).fill(true)))));

  let classInfo = new ClassInfo();
  // Stores the selected/not selected classes
  let [selectedClasses, setSelectedClasses] = useState(Array(0));
  let [notSelectedClasses, setNotSelectedClasses] = useState(classInfo.classCodes)

  // State for the snackbar and loading pop-ups
  const [open, setOpen] = React.useState(false);
  const [loadingOpen, setLoadingOpen] = React.useState(true);

  let selectData, disableData = null;
  let data = null;

  // States
  const [inputText, setInputText] = useState({
    firstName: "",
    lastName: ""
  })

  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
  });

  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  }

  // Makes the snackbar pop up
  const showCoreq = () => {
    if (!props.disable)
      setOpen(true);
  };

  // Closes the snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Logic for enabling the classes
  const disableLogic = (classCode, enable) => {
    if (classCode === "MAC 1105")
      enable([1, 4, 21]);
    else if (classCode === "MAC 1114") {
      if (select[4])
        enable([5]);
    }
    else if (classCode === "MAC 1140") {
      if (select[1])
        enable([5, 8]);
      else
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

    else if (classCode === 'CXX 3xxx or 4xxx I')
      enable([28]);
    else if (classCode === "CXX 4xxx I")
      enable([32]);
    else if (classCode === "CXX 4xxx II")
      enable([33]);
    else if (classCode === "CXX 4xxx III")
      enable([34]);
  }

  function updateClicked(classCode, id) {
    if (props.disable)
      return;
    toggleSelect(id);
    let pos = selectedClasses.indexOf(classCode);
    let nsPos = notSelectedClasses.indexOf(classCode);

    if (pos === -1) {
      selectedClasses.push(classCode);
      notSelectedClasses.splice(nsPos, 1);

      disableLogic(classCode, enable);
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

  // Enables a button
  const enable = (id) => {
    const newArr = [...disable];
    for (let i = 0; i < id.length; i++) {
      newArr[id[i]] = false;
    }
    setDisable(newArr);
  }

  // Toggles if the button is selected
  const toggleSelect = (id) => {
    const newArr = [...select];
    newArr[id] = !newArr[id];
    setSelect(newArr);
  }

  // Gets the user's data and makes the selector reflect it, if it exists
  const getData = async (auth) => {
    data = await getUserData(auth.currentUser.uid);
    if (data === null)
      setLoadingOpen(false);
    else {
      if (props.showName) {
        setInputText({ firstName: data.firstName, lastName: data.lastName });
      }
      disableData = disable;
      selectData = select;
      for (let x = 0; x < classInfo.classCodes.length; x++) {
        let pos = data.completedClasses.indexOf(classInfo.classCodes[x]);
        if (pos !== -1) {
          updateData(data.completedClasses[pos], x);
        }
      }
      setSelect(selectData);
      setDisable(disableData);
      selectData = null;
      disableData = null;
      setSelectedClasses(data.completedClasses);
      setNotSelectedClasses(data.outstandingClasses);
      setLoadingOpen(false);
    }
  }

  // Helper functions for getData
  const updateData = (code, id) => {
    toggleSelectData(id);
    toggleDisableData(code);
  }

  const toggleSelectData = (id) => {
    selectData[id] = true;
  }

  const toggleDisableData = (classCode) => {
    disableLogic(classCode, enableData);
  }

  const enableData = (id) => {
    for (let i = 0; i < id.length; i++) {
      disableData[id[i]] = false;
    }
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        if (props.setNavTitle) {
          if (props.showName) {
            props.setNavTitle('');
          } else {
            props.setNavTitle('Course selection');
          }
        }
        getData(auth);
      } else {
        // If they are logged out, redirects to login
        history.push('/login');
      }
    });
  }, [])

  // Saves the data to firebase
  const saveData = async () => {
    const dataAuth = getAuth();
    const email = dataAuth.currentUser.email;
    const data = await getUserData(dataAuth.currentUser.uid);
    let userD = null;

    if (inputText.firstName.length < 1 && inputText.lastName.length < 1)
      setErrors({ ...errors, firstNameError: true, lastNameError: true });
    else if (inputText.firstName.length < 1)
      setErrors({ ...errors, firstNameError: true, lastNameError: false });
    else if (inputText.lastName.length < 1)
      setErrors({ ...errors, lastNameError: true, firstNameError: false });
    else
      setErrors({ ...errors, firstNameError: false, lastNameError: false });

    if ((inputText.firstName.length < 1 || inputText.lastName.length < 1) && props.showName)
      window.scrollTo(0, 0);
    else {
      // Degree progress percent logic
      let comp = selectedClasses.length;
      let total = 33;
      if (selectedClasses.indexOf("CHM 1045C") !== -1 && selectedClasses.indexOf("BSC 2010") !== -1 && selectedClasses.indexOf("BSC 2011") !== -1) {
        if (selectedClasses.indexOf("PHY 2048C") !== -1)
          comp -= 1;
        if (selectedClasses.indexOf("PHY 2049C") !== -1)
          comp -= 1;
      }
      else if (selectedClasses.indexOf("PHY 2048C") !== -1 || selectedClasses.indexOf("PHY 2049C") !== -1) {
        total = 32;
        if (selectedClasses.indexOf("CHM 1045C") !== -1)
          comp -= 1;
        if (selectedClasses.indexOf("BSC 2010") !== -1)
          comp -= 1;
        if (selectedClasses.indexOf("BSC 2011") !== -1)
          comp -= 1;
      }
      else
        total = 33;

      const percent = Math.round((comp / total) * 100);

      if (props.showName) {
        userD = new UserData(
          inputText.firstName,
          inputText.lastName,
          email,
          selectedClasses,
          notSelectedClasses,
          percent
        );
      }
      else {
        userD = new UserData(
          data.firstName,
          data.lastName,
          email,
          selectedClasses,
          notSelectedClasses,
          percent
        );
      }
      
      await setUserData(userD, dataAuth.currentUser.uid);
      history.push('/');
    }
  }

  const editHandler = () => {
    history.push('/edit_courses');
  }

  return (
    <div>
      {props.showName && (
        <Card sx={{
          width: 'calc(100vw - 100px)',
          mt: 5,
        }} elevation={1}>
          <Stack className="crs-select-name-stack" spacing={3}>
            <Typography variant="h4" >Enter your first and last name</Typography>
            <TextField
              className="crs-select-name"
              type="text"
              value={inputText.firstName}
              onChange={handleInputChange}
              label="First Name"
              variant="outlined"
              name="firstName"
              color="secondary"
              required
              error={errors.firstNameError}
              helperText={errors.firstNameError ? "Please enter your first name" : ""}
            />

            <TextField
              className="crs-select-name"
              type="text"
              value={inputText.lastName}
              onChange={handleInputChange}
              label="Last Name"
              variant="outlined"
              name="lastName"
              color="secondary"
              required
              error={errors.lastNameError}
              helperText={errors.lastNameError ? "Please enter your last name" : ""}
            />

          </Stack>
        </Card>)}

      <Card sx={{
        width: 'calc(100vw - 100px)',
        mt: 5,
      }} elevation={1}>
        <Backdrop open={loadingOpen} style={{ zIndex: 2 }}>
          <CircularProgress color="secondary" />
        </Backdrop>
        <CardContent>
          {!props.hideTitle && (
            <Stack alignItems="center" marginTop={5} >
              <Typography padding={3} variant="h4">Select your completed and current classes</Typography>
            </Stack>
          )}
          <Stack className="crs-select-stack" direction="row" justifyContent="center">
            <Stack className="crs-select-stack" spacing={2}>
              <Stack direction="row" spacing={2}>
                <Card style={{ minWidth: '1310px' }} elevation={4}>
                  <CardContent>
                    <Stack spacing={2} direction="row">
                      <Stack spacing={2} direction="row">
                        <Stack spacing={2}>
                          <CourseButton courseCode='MAC 1105' courseName='College Algebra' id={0} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='MAC 1114' courseName='Trigonometry' id={1} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='MAC 2312' courseName='Calculus II' id={2} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <Tooltip title="You can take: STA 3032 Applied Statistics for Engineers and Scientists or STA 4231 Intro to Mathematical Statistics in place of this class." placement="bottom" arrow>
                            <div>
                              <CourseButton courseCode='STA 4442' courseName='Intro to Probability' id={3} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                            </div>
                          </Tooltip>
                        </Stack>
                        <Stack spacing={2}>
                          <CourseButton courseCode='MAC 1140' courseName='Precalculus' id={4} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='MAC 2311' courseName='Calculus I' id={5} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='MAD 2104' courseName='Discrete Math I' id={6} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='MAD 3105' courseName='Discrete Math II' id={7} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        </Stack>
                      </Stack>

                      <Stack spacing={2}>
                        <Stack alignItems="center">
                          <Tooltip title="You can also take COP 3014 Programming I and COP 3353 Unix in place of this class." placement="top" arrow>
                            <div>
                              <CourseButton courseCode='COP 3363' courseName='Intro to Programming in C++' id={8} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                            </div>
                          </Tooltip>
                        </Stack>

                        <Container>
                          <Stack spacing={2} alignItems="center">
                            <Stack spacing={2} direction="row">
                              <CourseButton courseCode='CIS 3250' courseName='Ethics in Computer Science' id={9} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                              <CourseButton courseCode='COP 3330' courseName='Data Struc, Algs, and Gen Program I' id={10} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                              <CourseButton courseCode='CDA 3100' courseName='Computer Organization I' id={11} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                            </Stack>
                            <Stack spacing={2} direction="row" justifyContent="flex-start">
                              <CourseButton courseCode='COT 4420' courseName='Theory of Computation' id={12} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                              <CourseButton courseCode='COP 4530' courseName='Data Struc, Algs and Gen Program II' id={13} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                            </Stack>
                          </Stack>
                        </Container>
                        <Stack spacing={2} direction="row">
                          <CourseButton courseCode='CEN 4020' courseName='Software Engineering' id={14} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='CEN 4090L' courseName='SE Capstone' id={15} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='COP 4521' courseName='Secure, Parallel and Dist. Python' id={16} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='COP 4610' courseName='Op Sys and Conc Progr' id={17} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
                <Card style={{ height: '290px', minWidth: '230px' }} elevation={4}>
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
                    <Card elevation={4}>
                      <CardContent>
                        <Stack spacing={2}>
                          <CourseButton courseCode='CHM 1045C' courseName='Gen Chem I w/lab' id={21} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='BSC 2010' courseName='Bio Sci I' id={22} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='BSC 2011' courseName='Bio Sci II' id={23} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        </Stack>
                      </CardContent>
                    </Card>
                    <Card style={{ height: '206px' }} elevation={4}>
                      <CardContent>
                        <Stack spacing={2}>
                          <CourseButton courseCode='PHY 2048C' courseName='Gen Physics I w/lab' id={24} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                          <CourseButton courseCode='PHY 2049C' courseName='Gen Physics II w/lab' id={25} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                  <Card style={{ height: '105px' }} elevation={4}>
                    <CardContent>
                      <CourseButton courseCode='XXX xxxx' courseName='Science for Majors' id={26} selectState={select} disableState={disable} onClick={toggleSelect} update={updateClicked}></CourseButton>
                    </CardContent>
                  </Card>
                </Stack>

                <Stack spacing={2}>
                  <Card elevation={4}>
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
          <Stack alignItems="center">
            {props.disable && (
              <Button variant="contained" onClick={editHandler}>Edit your classes</Button>
            )}
            {!props.disable && (
              <Button variant="contained" onClick={saveData}>Save</Button>
            )}
          </Stack>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }} >
              Please note that COP 3330 and CDA 3100 are corequisites!
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseSelection