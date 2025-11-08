import { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await loginUser();
    } else {
      await registerUser();
    }
  };

  const registerUser = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://fastorcrmbackend.onrender.com/api/user/register',
        { name, email, password }
      );

      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://fastorcrmbackend.onrender.com/api/user/login',
        { email, password }
      );

      if (response.data.success) {
        localStorage.setItem('fastorToken', response.data.fastorToken);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #132440 0%, #16476A 50%, #3B9797 100%)',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        overflow: 'hidden',
      }}
    >
      <ToastContainer position='top-center' autoClose={2000} />

      {/* LEFT HERO SECTION */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: { md: 6 },
          pl: { md: 8 },
          pr: { md: 4 },
          textAlign: 'left',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ maxWidth: '500px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Typography
              sx={{
                fontSize: '3.5rem',
                fontWeight: 800,
                color: '#fff',
                mb: 2,
                lineHeight: 1.1,
                letterSpacing: '-2px',
              }}
            >
              Fastor CRM
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography
              sx={{
                fontSize: '1.4rem',
                color: '#3B9797',
                mb: 3,
                fontWeight: 600,
              }}
            >
              Lead Management Simplified
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Typography
              sx={{
                fontSize: '1.05rem',
                color: '#e8eef2',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              Streamline your sales pipeline with intelligent lead management.
              Claim leads, track interactions, and scale your business faster.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {[
                { icon: '✓', text: 'Real-time Lead Updates' },
                { icon: '✓', text: 'Seamless Lead Management' },
                { icon: '✓', text: 'Team Collaboration' },
                { icon: '✓', text: 'Instant Notifications' },
              ].map((feature, i) => (
                <Box
                  key={i}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                  <Typography
                    sx={{
                      color: '#BF092F',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      minWidth: '24px',
                    }}
                  >
                    {feature.icon}
                  </Typography>
                  <Typography
                    sx={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}
                  >
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* RIGHT FORM SECTION */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: { xs: 3, sm: 4, md: 6 },
          width: '100%',
          minHeight: '100vh',
          flex: { xs: 'none', md: 1 },
        }}
      >
        <AnimatePresence mode='wait'>
          <Card
            key={isLogin ? 'login-card' : 'register-card'}
            component={motion.div}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            sx={{
              width: '100%',
              maxWidth: '420px',
              p: { xs: 3, sm: 4 },
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              borderRadius: '16px',
              backgroundColor: '#fff',
            }}
          >
            {/* HEADER */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  color: '#132440',
                  mb: 1,
                }}
              >
                {isLogin ? 'Welcome Back' : 'Join Us'}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                {isLogin
                  ? 'Sign in to access your leads'
                  : 'Create your account to get started'}
              </Typography>
            </Box>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  label='Full Name'
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='John Doe'
                  sx={{ mb: 2.5 }}
                />
              )}

              <TextField
                label='Email'
                type='email'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@example.com'
                sx={{ mb: 2.5 }}
              />

              <TextField
                label='Password'
                type='password'
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                sx={{ mb: 3 }}
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={loading}
                sx={{
                  py: 1.4,
                  mb: 2,
                  background:
                    'linear-gradient(135deg, #16476A 0%, #BF092F 100%)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(191, 9, 47, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(191, 9, 47, 0.3)',
                  },
                  '&:disabled': {
                    background: '#ccc',
                    boxShadow: 'none',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={20} color='inherit' />
                ) : isLogin ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </Button>

              {loading && (
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: '#16476A',
                    fontWeight: 600,
                  }}
                >
                  It may take 30s due to server slip.
                  <br />
                  Thank you for your patience.
                </Typography>
              )}
            </form>

            {/* CTA SECTION */}
            <Box
              sx={{
                textAlign: 'center',
                mt: 3,
                pt: 3,
                borderTop: '1px solid #e8eef2',
              }}
            >
              <Typography sx={{ fontSize: '0.85rem', color: '#95a5a6', mb: 1.5 }}>
                {isLogin ? (
                  <>
                    Don’t have an account?{' '}
                    <Typography
                      component='span'
                      onClick={handleToggleMode}
                      sx={{
                        color: '#BF092F',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'inline',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#3B9797',
                        },
                      }}
                    >
                      Register now
                    </Typography>
                    .
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <Typography
                      component='span'
                      onClick={handleToggleMode}
                      sx={{
                        color: '#BF092F',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        display: 'inline',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#3B9797',
                        },
                      }}
                    >
                      Sign in instead
                    </Typography>
                    .
                  </>
                )}
              </Typography>

              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: '#b0b0b0',
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                }}
              >
                Made with <span style={{ color: '#BF092F' }}>❤️</span> by Safeer
                Alam
              </Typography>
            </Box>
          </Card>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default Auth;
