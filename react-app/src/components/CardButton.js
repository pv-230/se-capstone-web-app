import React from "react"
import { Card, CardActionArea, Stack, CardContent, Typography } from "@mui/material"

const CardButton = (props) => {
    const [clicked, setClicked] = React.useState(true);
    const handleClick = () => {
        setClicked(!clicked);
        props.update(props.classCode);
    };

    var style = {
        display: 'block',
        width: '200px',
        height: '200px',
        textAlign: 'center',
    }

    var clickedStyle = {
        background: 'linear-gradient(45deg, #0057d1 30%, #0095ff 90%)',
        display: 'block',
        width: '200px',
        height: '200px',
        textAlign: 'center',
        color: 'white'
    }

    var typographyStyle = {
        "fontFamily": `"Segoe UI", "sans-serif"`,
        "fontSize": 25,
        "fontWeight": 700,
    }

    return (
        <Card style={clicked? style : clickedStyle}>
            <CardActionArea onClick={handleClick} style={style}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography style={typographyStyle}>{props.classCode}</Typography>
                        <Typography style={typographyStyle}>{props.className}</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardButton