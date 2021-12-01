import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Card, Typography } from "@mui/material";
import { getUserData } from '../APIs/getUserData';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
}));


export default function ProgressWithLabel(props) {
  const [percent, setPercent] = useState(0);

  const getPercent = async () => {
    await getUserData(props.uid)
      .then((result) => {
        setPercent(Number.parseInt(result.percentDone));
      })
      .catch(error => {
        return 0;
      });
  }

  useEffect(() => {
    getPercent();
  }, [])
  
  return (
    <div>
      <Card sx={{
        width: 'calc(100vw - 100px)',
        padding: '2%',
        mt: 5,
      }} elevation={1}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" marginBottom={3}>Degree Progress Percentage</Typography>
          <BorderLinearProgress value={percent} />
        </Box>
      </Card>
    </div>

  );
}
