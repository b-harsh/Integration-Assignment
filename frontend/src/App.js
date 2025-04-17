import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import FToClick from './components/FToClick';
import IngStatus from './components/IngStatus';
import JToFile from './components/JToFile';
import PreData from './components/PreData';
import ClicktoFile from './components/ClicktoFile';

function NavBar() {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Data Ingestion Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color={location.pathname === '/' ? 'secondary' : 'inherit'}
            component={Link}
            to="/"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333', // Slightly lighter black for hover
              },
            }}
          >
            File → ClickHouse
          </Button>

          <Button
            variant="contained"
            color={
              location.pathname === '/clicktofile' ? 'secondary' : 'inherit'
            }
            component={Link}
            to="/clicktofile"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            ClickHouse → File
          </Button>

          <Button
            variant="contained"
            color={location.pathname === '/status' ? 'secondary' : 'inherit'}
            component={Link}
            to="/status"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Status
          </Button>
          <Button
            variant="contained"
            color={location.pathname === '/join' ? 'secondary' : 'inherit'}
            component={Link}
            to="/join"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Join to File
          </Button>
          <Button
            variant="contained"
            color={location.pathname === '/preview' ? 'secondary' : 'inherit'}
            component={Link}
            to="/preview"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Preview
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <NavBar /> {/* The Navbar now contains the useLocation hook */}
      <Routes>
        <Route path="/" element={<FToClick />} />
        <Route path="/join" element={<JToFile />} />
        <Route path="/preview" element={<PreData />} />
        <Route path="/status" element={<IngStatus />} />
        <Route path="/clicktofile" element={<ClicktoFile />} />
      </Routes>
    </Router>
  );
}

export default App;
