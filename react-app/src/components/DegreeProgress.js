import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Card, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getUserData } from '../APIs/getUserData';
import { UserData } from '../models/UserData';

let percentage = 0;
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
  

export default function ProgressWithLabel() {

  return (
    <div>
        <Card sx={{
            width: 'calc(100vw - 100px)',
            padding: '2%',
            mt: 5,
        }} elevation={1}>
            <Box sx={{ width: '100%' }}>
                <BorderLinearProgress value={percentage} />
            </Box>
        </Card>
    </div>

  );
}
