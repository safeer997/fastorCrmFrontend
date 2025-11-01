import { useEffect } from 'react';
import { Box, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ showMyLeads, setShowMyLeads }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function getUserNameFromToken() {
      const token = localStorage.getItem('fastorToken');
      console.log('Token from localStorage:', token);

      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decodedToken);
        const email = decodedToken.email;
        console.log('Email from token:', email);
        setUserName(email);
      }
    }

    getUserNameFromToken();
  }, []);

  function handleShowMyLeads() {
    // console.log('Show my leads button clicked');
    console.log(' showMyLeads :', showMyLeads);
    setShowMyLeads(!showMyLeads);
  }

  function handleLeadForm() {
    navigate('/submitlead');
  }

  function handleLogout() {
    const token = localStorage.getItem('fastorToken');
    console.log('Token from localStorage:', token);

    if (token) {
      localStorage.removeItem('fastorToken');
    }
    setUserName('');
    navigate('/auth');
  }

  return (
    <AppBar position='static' sx={{ background: '#2c3e50' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Fastor CRM
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant='body2' sx={{ color: 'white' }}>
            Welcome, {userName}
          </Typography>

          <Button
            variant='outlined'
            color='inherit'
            onClick={handleShowMyLeads}
          >
            {showMyLeads === true && 'Show All Leads'}
            {showMyLeads === false && 'Show My Leads'}
          </Button>

          <Button variant='outlined' color='inherit' onClick={handleLeadForm}>
            Lead Form
          </Button>

          <Button
            variant='contained'
            color='error'
            onClick={handleLogout}
            sx={{ background: '#e74c3c' }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
