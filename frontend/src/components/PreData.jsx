import { Box, Button, Typography, CircularProgress, Alert, TextField, Grid } from '@mui/material';
import React, { useState } from 'react';
import { PreviewData } from '../api/ingestionApi';

function PreData() {
  const [previewResult, setPreviewResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for form inputs
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState(8123);
  const [user, setUser] = useState('default');
  const [jwtToken, setJwtToken] = useState('');
  const [database, setDatabase] = useState('default');
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState('');
  const [limit, setLimit] = useState(5);

  const handlePreview = async () => {
    setLoading(true);
    setError(null);

    // Format columns as an array (e.g., 'id,name' -> ['id', 'name'])
    const columnArray = columns.split(',').map((col) => col.trim());

    try {
      const response = await PreviewData({
        host,
        port,
        user,
        jwt_token: jwtToken,
        database,
        table_name: tableName,
        columns: columnArray,
        limit
      });
      setPreviewResult(response.data);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Preview Data</Typography>

      {/* Form Inputs for dynamic data */}
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
            label="Table Name"
            fullWidth
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Columns (comma separated)"
            fullWidth
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            helperText="e.g., id,name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Limit"
            fullWidth
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            type="number"
          />
        </Grid>
      </Grid>

      {/* Fetch Preview Button */}
      <Box sx={{ my: 3 }}>
        <Button variant="contained" onClick={handlePreview} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Fetch Preview'}
        </Button>
      </Box>

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Preview Result */}
      {previewResult && (
        <Box sx={{ mt: 2, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <Typography variant="subtitle1">Result:</Typography>
          <pre>{JSON.stringify(previewResult, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}

export default PreData;
