import React, { useState } from "react"
import { Container, Typography, Card, Stack, Button, CardContent } from "@mui/material"
import '../styles/CourseSelection.css'


const CourseSelection = () => {
    
    return(
        <Card className="crs-select-card" elevation={4}>
            <Stack direction="row" justifyContent="center">
                <Stack className="crs-select-stack" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Card elevation={10}>
                            <CardContent>
                                <Stack spacing={2} direction="row">
                                    <Stack spacing={2} direction="row">
                                        <Stack  spacing={2}>
                                            <Button className="main-button" variant="contained">MAC 1105</Button>
                                            <Button className="main-button" variant="contained">MAC 1114</Button>
                                            <Button className="main-button" variant="contained">MAC 2312</Button>
                                            <Button className="main-button" variant="contained">STA 4442</Button>
                                        </Stack>
                                        <Stack  spacing={2}>
                                            <Button className="main-button" variant="contained">MAC 1140</Button>
                                            <Button className="main-button" variant="contained">MAC 2311</Button>
                                            <Button className="main-button" variant="contained">MAD 2104</Button>
                                            <Button className="main-button" variant="contained">MAD 3105</Button>
                                        </Stack>
                                    </Stack>

                                    <Stack  spacing={2}>
                                        <Container>
                                            <Button className="main-button" variant="contained">COP 3363</Button>
                                        </Container>

                                        <Container>
                                            <Stack spacing={2} alignItems="center">
                                                <Stack spacing={2} direction="row">
                                                    <Button className="main-button" variant="contained">CIS 3250</Button>
                                                    <Button className="main-button" variant="contained">COP 3330</Button>
                                                    <Button className="main-button" variant="contained">CDA 3100</Button>
                                                </Stack>
                                                <Stack spacing={2} direction="row" justifyContent="flex-start">
                                                    <Button className="main-button" variant="contained">COT 4420</Button>
                                                    <Button className="main-button" variant="contained">COP 4530</Button>
                                                </Stack>
                                            </Stack>
                                        </Container>
                                        <Stack spacing={2} direction="row">
                                            <Button className="main-button" variant="contained">CEN 4020</Button>
                                            <Button className="main-button" variant="contained">CEN 4020L</Button>
                                            <Button className="main-button" variant="contained">COP 4521</Button>
                                            <Button className="main-button" variant="contained">COP 4610</Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Card style={{height: '15vw'}} backgroundColor="primary" elevation={10}>
                            <CardContent>
                                <Stack  spacing={2}>
                                    <Button className="main-button" variant="contained">Foreign Language 1</Button>
                                    <Button className="main-button" variant="contained">Foreign Language 2</Button>
                                    <Button className="main-button" variant="contained">Foreign Language 3</Button>
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
                                            <Button className="main-button" variant="contained">CHM 1045C</Button>
                                            <Button className="main-button" variant="contained">BSC 2010</Button>
                                            <Button className="main-button" variant="contained">BSC 2011</Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Card style={{height: '10.5vw'}} elevation={10}>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <Button className="main-button" variant="contained">PHY 2048C</Button>
                                            <Button className="main-button" variant="contained">PHY 2049C</Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>
                            <Card elevation={10}>
                                <CardContent>
                                    <Button className="main-button" variant="contained">XXXxxx</Button>
                                </CardContent>
                            </Card>
                        </Stack>

                        <Stack  spacing={2}>
                            <Card elevation={10}>
                                <CardContent>
                                    <Stack spacing={2} direction="row">
                                        <Button className="main-button" variant="contained">CXX 3xxx or 4xxx</Button>
                                        <Button className="main-button" variant="contained">CXX 4xxx</Button>
                                        <Button className="main-button" variant="contained">CIS 4900 or CXX 3xxx</Button>
                                        <Button className="main-button" variant="contained">CS 4xxx or Advanced Math</Button>
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