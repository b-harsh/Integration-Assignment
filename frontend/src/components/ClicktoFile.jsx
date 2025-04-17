import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, CircularProgress, TextField, Alert } from '@mui/material';
import ProgressBar from './ProgressBar';
import { getProgress, ClickhouseToFile } from '../api/ingestionApi';



function ClicktoFile() {
  const [progress, setProgress] = useState(0);
  const [taskId, setTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    host: '',
    port: '',
    user: '',
    jwt_token: '',
    database: '',
    table_name: '',
    columns: '',
    file_name: '',
    delimiter: ''
  });

  // Update formData state on user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Start the ingestion process
  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ClickhouseToFile(formData);
      setTaskId(response.data.task_id);
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
        const status = await getProgress(taskId);
        setProgress(status.progress);
        if (status.progress >= 100) clearInterval(interval);
      } catch (err) {
        console.error(err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>ClickHouse to File</Typography>

      <TextField
        label="Host"
        variant="outlined"
        fullWidth
        name="host"
        value={formData.host}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Port"
        variant="outlined"
        fullWidth
        name="port"
        type="number"
        value={formData.port}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="User"
        variant="outlined"
        fullWidth
        name="user"
        value={formData.user}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="JWT Token"
        variant="outlined"
        fullWidth
        name="jwt_token"
        value={formData.jwt_token}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Database"
        variant="outlined"
        fullWidth
        name="database"
        value={formData.database}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Table Name"
        variant="outlined"
        fullWidth
        name="table_name"
        value={formData.table_name}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Columns (comma separated)"
        variant="outlined"
        fullWidth
        name="columns"
        value={formData.columns}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="File Name"
        variant="outlined"
        fullWidth
        name="file_name"
        value={formData.file_name}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Delimiter"
        variant="outlined"
        fullWidth
        name="delimiter"
        value={formData.delimiter}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleStart} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Start Ingestion'}
      </Button>

      <Box sx={{ my: 3 }}>
        <ProgressBar value={progress} />
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {progress >= 100 && (
        <Alert severity="success">Ingestion completed successfully!</Alert>
      )}
    </Box>
  );
}

export default ClicktoFile;
