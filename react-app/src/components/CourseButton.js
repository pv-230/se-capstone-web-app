import { useState } from "react"
import { Button, Stack, Typography } from "@mui/material"
import '../styles/CourseSelection.css'

const CourseButton = (props) => {
    const [selected, setSelected] = useState(false);

    const cbClick = () => {
        setSelected(!selected);
        props.onClick(props.id);
        props.update(props.courseCode);
    }

    return(
        <Button 
            onClick={cbClick} 
            color={(props.selectState[props.id] ? "secondary" : "primary")} 
            disabled={props.disableState[props.id]} 
            className="main-button" 
            variant="contained">
            <Stack>
                <Typography variant="h7">
                    {props.courseCode}
                </Typography>
                <Typography variant="h7">
                    {props.courseName}
                </Typography>
            </Stack>
        </Button>
    )
}

export default CourseButton