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
    <Card elevation={6}>
      <CardActionArea onClick={handleClick}>
        <CardContent className={clicked ? "card-button-clicked" : "card-button-default"}>
          <Stack spacing={1} height="19vh" justifyContent="center">
            <Typography variant="h4">{props.classCode}</Typography>
            <Typography variant="h6">{props.className}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardButton