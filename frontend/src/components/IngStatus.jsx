import { Box, Button, Stack, TextField, Typography, Alert } from '@mui/material';
import React, { useState } from 'react';
import { IngestionStatus } from '../api/ingestionApi';  // Ensure this function is correctly imported
import StatusCard from './StatusCard';

function IngStatus() {
  const [taskIdInput, setTaskIdInput] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState(null);  // Track errors

  const fetchStatus = async (taskId) => {
    try {
      const response = await IngestionStatus(taskId); // Assuming this returns the correct response object
      return response.data;
    } catch (err) {
      setError('Failed to fetch status, please try again.');
      console.error('Failed to fetch status:', err);
    }
  };

  const handleCheckStatus = async () => {
    if (!taskIdInput) return;

    setError(null);  // Clear previous errors

    const statusResult = await fetchStatus(taskIdInput);
    if (statusResult) {
      setStatuses((prev) => [...prev, statusResult]);
    }
    setTaskIdInput(''); // Clear input after fetching status
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ingestion Status Dashboard
      </Typography>

      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <TextField
          label="Enter Task ID"
          value={taskIdInput}
          onChange={(e) => setTaskIdInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleCheckStatus}>
          Check Status
        </Button>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}  {/* Show error message if any */}

      {statuses.map((status) => (
        <StatusCard
          key={status.task_id}
          taskId={status.task_id}
          progress={status.progress}
        />
      ))}
    </Box>
  );
}

export default IngStatus;
