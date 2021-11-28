import { Typography, Card, Stack, Slider, Button, Container } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const CourseRecommendation = () => {


  return (
    <div>
      <Card sx={{
        width: 'calc(100vw - 100px)',
        mt: 5,
      }} elevation={1} elevation={1}>
        <Stack spacing={2} margin={5} alignItems="center">
          <Typography>Select the number of required Computer Science classes you want to take</Typography>
          <Box width="500px">
            <Slider valueLabelDisplay="auto" max={6} marks />
          </Box>
          <Button variant="contained" width="a">Get recomended Computer Science classes</Button>
        </Stack>
      </Card>
    </div>
  )
}

export default CourseRecommendation