import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Grid,
} from '@mui/material';
import ProgressBar from './ProgressBar';
import { getProgress, JoinToFile } from '../api/ingestionApi';

function JToFile() {
  const [progress, setProgress] = useState(0);
  const [taskId, setTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Input fields state
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState(8123); // Port value used here
  const [user, setUser] = useState('default');
  const [jwtToken, setJwtToken] = useState('');
  const [database, setDatabase] = useState('default');
  const [tableNames, setTableNames] = useState('');
  const [joinConditions, setJoinConditions] = useState('');
  const [fileName, setFileName] = useState('joined_output.csv');
  const [delimiter, setDelimiter] = useState(',');

  const handleStart = async () => {
    setLoading(true);
    setError(null);

    // Format table names as an array
    const tableArray = tableNames.split(',').map((table) => table.trim());

    try {
      // Trigger the backend to start the ingestion process
      const response = await JoinToFile({
        host,
        port, // Pass the port value to the backend
        user,
        jwt_token: jwtToken,
        database,
        table_names: tableArray,
        join_conditions: joinConditions,
        file_name: fileName,
        delimiter,
      });

      setTaskId(response.data.task_id); // Save the taskId to track progress
      setProgress(0);
    } catch (err) {
      setError(err.message || 'Failed to start ingestion.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const status = await getProgress(taskId); // Get progress with taskId
        setProgress(status.progress);
        if (status.progress >= 100) clearInterval(interval); // Stop when progress is 100%
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ClickHouse Join to File
      </Typography>

      {/* Input Form */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Host"
            fullWidth
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Port"
            fullWidth
            value={port}
            onChange={(e) => setPort(Number(e.target.value))}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="User"
            fullWidth
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="JWT Token"
            fullWidth
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Database"
            fullWidth
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Table Names"
            fullWidth
            value={tableNames}
            onChange={(e) => setTableNames(e.target.value)}
            helperText="Comma separated tables"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Join Conditions"
            fullWidth
            value={joinConditions}
            onChange={(e) => setJoinConditions(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="File Name"
            fullWidth
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Delimiter"
            fullWidth
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Start Ingestion Button */}
      <Box sx={{ my: 3 }}>
        <Button variant="contained" onClick={handleStart} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Start Ingestion'}
        </Button>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ my: 3 }}>
        <ProgressBar value={progress} />
      </Box>

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Success Message */}
      {progress >= 100 && (
        <Alert severity="success">Ingestion completed successfully!</Alert>
      )}
    </Box>
  );
}

export default JToFile;
