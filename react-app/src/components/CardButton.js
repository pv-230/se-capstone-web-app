import React, { useState } from "react"
import { Card, CardActionArea, Stack, CardContent, Typography } from "@mui/material"
import '../styles/CardButton.css'

const CardButton = (props) => {
    // Toggle state for updating card style when clicked
    const [clicked, setClicked] = useState(false);

    // Event handler for card action area clicks
    const handleClick = () => {
        setClicked(!clicked);
        props.update(props.classCode);
    };

    return (
        <Card className={clicked ? "card-button-clicked" : "card-button-default"} elevation={6}>
            <CardActionArea className="card-button-default" onClick={handleClick}>
                <CardContent className={clicked ? "card-content-clicked" : "card-content-default"}>
                    <Stack spacing={2}>
                        <Typography variant="h4">{props.classCode}</Typography>
                        <Typography variant="h6">{props.className}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardButton