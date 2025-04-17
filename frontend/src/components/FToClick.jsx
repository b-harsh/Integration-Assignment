import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileToClickhouse, getProgress } from '../api/ingestionApi';
import ProgressBar from './ProgressBar';

function FToClick() {
  const [progress, setProgress] = useState(0);
  const [taskId, setTaskId] = useState(null);
  const [filePath, setFilePath] = useState(''); // local file path
  const [columns, setColumns] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState(8123);
  const [user, setUser] = useState('default');
  const [jwtToken, setJwtToken] = useState('');
  const [database, setDatabase] = useState('default');
  const [tableName, setTableName] = useState('your_table');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!filePath || !columns || !tableName) {
      alert('Please fill in all the required fields');
      return;
    }

    const payload = {
      file_path: filePath,
      delimiter,
      columns: columns
        .split(',')
        .map((col) => col.trim())
        .join(','),
      host,
      port,
      user,
      jwt_token: jwtToken,
      database,
      table_name: tableName,
    };

    try {
      setLoading(true);
      const response = await FileToClickhouse(payload);

      setTaskId(response.data.task_id);
      setProgress(0);
    } catch (error) {
      console.error('Error starting ingestion:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      const data = await getProgress(taskId);
      setProgress(data.progress);
      if (data.progress === 100) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Flat File to ClickHouse
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="File Path"
            variant="outlined"
            fullWidth
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Columns (comma-separated)"
            variant="outlined"
            fullWidth
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Delimiter"
            variant="outlined"
            fullWidth
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Host"
            variant="outlined"
            fullWidth
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Port"
            variant="outlined"
            fullWidth
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="User"
            variant="outlined"
            fullWidth
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="JWT Token"
            variant="outlined"
            fullWidth
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Database"
            variant="outlined"
            fullWidth
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Table Name"
            variant="outlined"
            fullWidth
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box sx={{ my: 2 }}>
        <Button variant="contained" onClick={handleStart} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Start Ingestion'}
        </Button>
      </Box>

      {taskId && (
        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Task ID: {taskId}</Typography>
        </Box>
      )}

      <ProgressBar value={progress} />
    </Box>
  );
}

export default FToClick;
