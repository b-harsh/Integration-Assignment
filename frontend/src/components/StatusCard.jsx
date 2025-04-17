import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function StatusCard({ taskId, progress }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Task ID: {taskId}</Typography>
        <Typography>Progress: {progress}%</Typography>
      </CardContent>
    </Card>
  );
}

export default StatusCard;
