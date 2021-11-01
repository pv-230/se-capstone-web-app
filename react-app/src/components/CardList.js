import React from "react"
import { Card, Stack, CardContent, Typography } from "@mui/material"
import '../styles/CardList.css'

const CardList = (props) => {
    return (
        <Card elevation={6}>

                <CardContent className={"card-list-default"}>
                    <Stack spacing={1} height="12vh" justifyContent="center">
                        <Typography variant="h7">{props.classCode}</Typography>
                        <Typography variant="h7">{props.className}</Typography>
                    </Stack>
                </CardContent>
        </Card>
    )
}

export default CardList