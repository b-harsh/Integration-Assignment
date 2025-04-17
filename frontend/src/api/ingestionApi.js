import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Route for File to ClickHouse ingestion
export const FileToClickhouse = (data) =>
  axios.post(`${API_BASE_URL}/ingest/file-to-clickhouse`, data);

// Route for ClickHouse Join to File ingestion
export const JoinToFile = (data) =>
  axios.post(`${API_BASE_URL}/ingest/clickhouse-join-to-file`, data);

// Route for ClickHouse to File ingestion
export const ClickhouseToFile = (data) =>
  axios.post(`${API_BASE_URL}/ingest/clickhouse-to-file`, data);

// Route for fetching Ingestion Status
export const IngestionStatus = (taskId) =>
  axios.get(`${API_BASE_URL}/ingestion/status/${taskId}`);

// Route for getting ingestion progress
export const getProgress = () =>
  axios.get(`${API_BASE_URL}/ingestion/progress`);

// Route for previewing data
export const PreviewData = (data) =>
  axios.post(`${API_BASE_URL}/preview`, data);

// Route for schema discovery
export const DiscoverSchema = (data) =>
  axios.post(`${API_BASE_URL}/schema/discover`, data);
