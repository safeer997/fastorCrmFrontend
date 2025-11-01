import { useState } from 'react';
import {
  Box,
  Card,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function Auth() {
  const [tab, setTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleTabChange(e, newTab) {
    setTab(newTab);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (tab === 'register') {
      registerUser();
    } else {
      loginUser();
    }
  }

  async function registerUser() {
    const registerData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:7300/api/user/register',
        registerData
      );
      console.log('response :', response);

      const successStatus = response.data.success;
      const successMessage = response.data.message;

      if (successStatus === true) {
        console.log('Registration successful');
        toast.success(successMessage);
        setTab('login');
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log('registration error:', error);
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      console.log('Error message:', errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function loginUser() {
    const loginData = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:7300/api/user/login',
        loginData
      );
      console.log('Login response:', response);
      const successStatus = response.data.success;
      const successMessage = response.data.message;
      const fastorToken = response.data.fastorToken;

      if (successStatus === true) {
        console.log('Login successful');
        localStorage.setItem('fastorToken', fastorToken);
        toast.success(successMessage);
        setEmail('');
        setPassword('');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Login error:', error);
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      console.log('Error message:', errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f4f6f8',
      }}
    >
      <ToastContainer position='top-center' autoClose={2000} />

      <Card sx={{ p: 4, width: 360, boxShadow: 3 }}>
        <Typography variant='h5' align='center' sx={{ mb: 2 }}>
          Welcome to Fastor CRM
        </Typography>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant='fullWidth'
          sx={{ mb: 2 }}
        >
          <Tab label='Login' value='login' />
          <Tab label='Register' value='register' />
        </Tabs>

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div>
              <TextField
                label='Name'
                name='name'
                fullWidth
                margin='normal'
                required
                value={name}
                onChange={handleNameChange}
              />
            </div>
          )}

          <TextField
            label='Email'
            name='email'
            required
            fullWidth
            margin='normal'
            value={email}
            onChange={handleEmailChange}
          />

          <TextField
            label='Password'
            name='password'
            required
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            fullWidth
            type='submit'
            variant='contained'
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading === true && 'Please wait...'}
            {loading === false && tab === 'login' && 'Login'}
            {loading === false && tab === 'register' && 'Register'}
          </Button>
        </form>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ display: 'block', textAlign: 'center', mt: 2 }}
        >
          {tab === 'login'
            ? 'Do not have an account? Switch to Register'
            : 'Already have an account? Switch to Login'}
        </Typography>
      </Card>
    </Box>
  );
}

export default Auth;
