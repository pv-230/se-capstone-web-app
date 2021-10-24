import React from "react"
import { Container, Card, Stack, Button, CardContent } from "@mui/material"
import '../styles/CourseSelection.css'
import CourseButton from "./CourseButton"
import { useState } from "react"
import { ClassInfo } from '../models/ClassInfo'
import { minWidth, width } from "@mui/system"

const CourseSelection = () => {
    
    // States to keep track of what courses are selected/disabled
    const [mathSelect, setMathSelect] = useState(Array(8).fill(false));
    const [mathDisable, setMathDisable] = useState([false].concat(Array(7).fill(true)));

    const [chmSelect, setChmSelect] = useState(Array(3).fill(false));
    const [chmDisable, setChmDisable] = useState([true, false, true]);

    const [phySelect, setPhySelect] = useState(Array(2).fill(false));
    const [phyDisable, setPhyDisable] = useState(Array(2).fill(true));

    const [langSelect, setLangSelect] = useState(Array(3).fill(false));
    const [langDisable, setLangDisable] = useState([false, true, true]);

    const [csSelect, setCsSelect] = useState(Array(10).fill(false));
    const [csDisable, setCsDisable] = useState(Array(10).fill(true)); 

    const [electiveSelect, setElectiveSelect] = useState(Array(9).fill(false));

    let classInfo = new ClassInfo();
    const [selectedClasses, setSelectedClasses] = useState(Array(0));
    const [notSelectedClasses, setNotSelectedClasses] = useState(classInfo.classCodes)

    const testClick = () => {
        console.log(csDisable);
        const newArr = [...mathSelect];
        newArr[1] = true;
        setMathSelect(newArr);
    }

    function updateClicked(classCode) {
        let pos = selectedClasses.indexOf(classCode);
        let nsPos = notSelectedClasses.indexOf(classCode);
        if (pos === -1) {
          selectedClasses.push(classCode);
          notSelectedClasses.splice(nsPos, 1);
        }
        else {
          notSelectedClasses.push(classCode);
          selectedClasses.splice(pos, 1);
        }
        //console.log(selectedClasses);
        //console.log(notSelectedClasses);
      }
    
    const test = () => {
        console.log(selectedClasses);
        console.log(notSelectedClasses);
        console.log(mathSelect);
    }

    const toggleMathSelect = (id) => {
        const newArr = [...mathSelect];
        newArr[id] = !newArr[id];
        setMathSelect(newArr);
    }

    const toggleChmSelect = (id) => {
        const newArr = [...chmSelect];
        newArr[id] = !newArr[id];
        setChmSelect(newArr);
    }

    const togglePhySelect = (id) => {
        const newArr = [...phySelect];
        newArr[id] = !newArr[id];
        setPhySelect(newArr);
    }

    const toggleLangSelect = (id) => {
        const newArr = [...langSelect];
        newArr[id] = !newArr[id];
        setLangSelect(newArr);
    }

    const toggleCsSelect = (id) => {
        const newArr = [...csSelect];
        newArr[id] = !newArr[id];
        setCsSelect(newArr);
    }

    const toggleElectiveSelect = (id) => {
        const newArr = [...electiveSelect];
        newArr[id] = !newArr[id];
        setElectiveSelect(newArr);
    }

    return(
        <Card className="crs-select-card" elevation={8}>
            <Button variant="contained" onClick={test}>Show Selected</Button>
            <Stack className="crs-select-stack" direction="row" justifyContent="center">
                <Stack className="crs-select-stack" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Card style={{minWidth: '1310px'}} elevation={10}>
                            <CardContent>
                                <Stack spacing={2} direction="row">
                                    <Stack spacing={2} direction="row">
                                        <Stack  spacing={2}>
                                            <CourseButton courseCode='MAC 1105' courseName='College Algebra' id={0} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='MAC 1114' courseName='Trigonometry' id={1} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='MAC 2312' courseName='Calculus II' id={2} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='STA 4442' courseName='Intro to Probability' id={3} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                        </Stack>
                                        <Stack  spacing={2}>
                                            <CourseButton courseCode='MAC 1140' courseName='Precalculus' id={4} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='MAC 2311' courseName='Calculus I' id={5} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='MAD 2104' courseName='Discrete Math I' id={6} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='MAD 3105' courseName='Discrete Math II' id={7} selectState={mathSelect} disableState={mathDisable} onClick={toggleMathSelect} update={updateClicked}></CourseButton>
                                        </Stack>
                                    </Stack>

                                    <Stack  spacing={2}>
                                        <Container>
                                            <CourseButton courseCode='COP 3363' courseName='Programming I in Unix' id={0} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                        </Container>

                                        <Container>
                                            <Stack spacing={2} alignItems="center">
                                                <Stack spacing={2} direction="row">
                                                    <CourseButton courseCode='CIS 3250' courseName='Ethics and CS' id={1} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                                    <CourseButton courseCode='COP 3330' courseName='Object-Oriented Programming' id={2} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                                    <CourseButton courseCode='CDA 3100' courseName='Computer Organization I' id={3} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                                </Stack>
                                                <Stack spacing={2} direction="row" justifyContent="flex-start">
                                                    <CourseButton courseCode='COT 4420' courseName='Theory of Computation' id={4} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                                    <CourseButton courseCode='COP 4530' courseName='Data Struc, Algs and Gen Program' id={5} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                                </Stack>
                                            </Stack>
                                        </Container>
                                        <Stack spacing={2} direction="row">
                                            <CourseButton courseCode='CEN 4020' courseName='Software Engineering' id={6} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='CEN 4020L' courseName='SE Capstone' id={7} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='COP 4521' courseName='Secure, Parallel and Dist. Python' id={8} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='COP 4610' courseName='Op Sys and Conc Progr' id={9} selectState={csSelect} disableState={csDisable} onClick={toggleCsSelect} update={updateClicked}></CourseButton>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card style={{height: '290px', minWidth: '230px'}} elevation={10}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <CourseButton courseCode='Foreign Language I' courseName='' id={0} selectState={langSelect} disableState={false} onClick={toggleLangSelect} update={updateClicked}></CourseButton>
                                    <CourseButton courseCode='Foreign Language II' courseName='' id={1} selectState={langSelect} disableState={false} onClick={toggleLangSelect} update={updateClicked}></CourseButton>
                                    <CourseButton courseCode='Foreign Language III' courseName='' id={2} selectState={langSelect} disableState={false} onClick={toggleLangSelect} update={updateClicked}></CourseButton>
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
                                            <CourseButton courseCode='CHM 1045C' courseName='Gen Chem I w/lab' id={0} selectState={chmSelect} disableState={chmDisable} onClick={toggleChmSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='BSC 2010' courseName='Bio Sci I' id={1} selectState={chmSelect} disableState={chmDisable} onClick={toggleChmSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='BSC 2011' courseName='Bio Sci II' id={2} selectState={chmSelect} disableState={chmDisable} onClick={toggleChmSelect} update={updateClicked}></CourseButton>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Card style={{height: '200px'}} elevation={10}>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <CourseButton courseCode='PHY 2048C' courseName='Gen Physics I w/lab' id={0} selectState={phySelect} disableState={phyDisable} onClick={togglePhySelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='PHY 2049C' courseName='Gen Physics II w/lab' id={1} selectState={phySelect} disableState={phyDisable} onClick={togglePhySelect} update={updateClicked}></CourseButton>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>
                            <Card style={{height: '105px'}} elevation={10}>
                                <CardContent>
                                    <CourseButton courseCode='XXX xxxx' courseName='Science for Majors' id={0} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                </CardContent>
                            </Card>
                        </Stack>

                        <Stack  spacing={2}>
                            <Card elevation={10}>
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Stack spacing={2} direction="row">
                                            <CourseButton courseCode='CXX 3xxx or 4xxx I' courseName='Elective' id={1} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='CXX 4xxx I' courseName='Upper Division Elective' id={2} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='CIS 4900 or CXX 3xxx' courseName='' id={3} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='CS 4xxx or Advanced Math Elective' courseName='' id={4} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                        </Stack>
                                        <Stack spacing={2} direction="row">
                                            <CourseButton courseCode='CXX 3xxx or 4xxx II' courseName='Elective' id={5} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='CXX 4xxx II' courseName='Upper Division Elective' id={6} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='CXX 4xxx III' courseName='Upper Division Elective' id={7} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                            <CourseButton courseCode='CXX 4xxx IV' courseName='Upper Division Elective' id={8} selectState={electiveSelect} disableState={false} onClick={toggleElectiveSelect} update={updateClicked}></CourseButton>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}

export default CourseSelection