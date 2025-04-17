import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

function ProgressBar({ value }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body2">Progress: {value}%</Typography>
      <LinearProgress variant="determinate" value={value} />
    </Box>
  );
}

export default ProgressBar;
