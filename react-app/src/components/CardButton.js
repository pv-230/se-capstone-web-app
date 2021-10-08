import React from "react"
import { Card, CardActionArea, Stack } from "@mui/material"
import { CardContent } from "@mui/material"

const CardButton = (props) => {
    const [clicked, setClicked] = React.useState(true);
    const handleClick = () => {
        setClicked(!clicked);
        console.log(clicked);
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

    function getClicked() {
        return clicked;
    }

    return (
        <Card style={clicked? style : clickedStyle}>
            <CardActionArea onClick={handleClick} style={style}>
                <CardContent>
                    <Stack>
                        <h1>{props.classCode}</h1>
                        <h2>{props.className}</h2>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardButton