import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import PublicHeader from '../components/PublicHeader';
import Footer from '../components/Footer';

function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.courseInterest
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://fastorcrmbackend.onrender.com/api/lead/createlead',
        formData
      );

      if (response.data.success) {
        setSubmitted(true);
        toast.success('✓ Lead submitted successfully!');
        setFormData({ name: '', email: '', phone: '', courseInterest: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f7fa',
      }}
    >
      <ToastContainer position='top-center' autoClose={2000} />

      {/* GENERIC PUBLIC HEADER */}
      <PublicHeader title='Fastor CRM' showLogin={true} />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(180deg, #f5f7fa 0%, #f0f2f5 100%)',
          py: { xs: 1, md: 1 },
          display: 'flex',
          alignItems: 'center',
          marginTop: { xs: '16px', md: '24px' },
        }}
      >
        <Container maxWidth='md' sx={{ width: '100%' }}>
          {/* HEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '3rem', textAlign: 'center' }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                color: '#132440',
                mb: 1,
                letterSpacing: '-0.5px',
              }}
            >
              Submit Your Information
            </Typography>
            <Typography
              sx={{
                color: '#7f8c8d',
                fontSize: { xs: '0.9rem', md: '1rem' },
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Join our community and connect with industry experts. Fill out the
              form below and our team will get back to you as soon as possible.
            </Typography>
          </motion.div>

          {/* FORM CONTAINER */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
              gap: 3,
              maxWidth: '900px',
              mx: 'auto',
            }}
          >
            {/* LEFT: FORM CARD */}
            <Card
              component={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e8eef2',
              }}
            >
              <form onSubmit={handleSubmit}>
                {/* NAME FIELD */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <TextField
                    label='Full Name'
                    fullWidth
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='John Doe'
                    sx={{ mb: 2.5 }}
                  />
                </motion.div>

                {/* EMAIL FIELD */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TextField
                    label='Email Address'
                    type='email'
                    fullWidth
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='john@example.com'
                    sx={{ mb: 2.5 }}
                  />
                </motion.div>

                {/* PHONE FIELD */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <TextField
                    label='Phone Number'
                    fullWidth
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='+1 (555) 000-0000'
                    sx={{ mb: 2.5 }}
                  />
                </motion.div>

                {/* COURSE FIELD */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    label='Course Interest'
                    fullWidth
                    name='courseInterest'
                    value={formData.courseInterest}
                    onChange={handleChange}
                    placeholder='e.g., Web Development'
                    sx={{ mb: 3 }}
                  />
                </motion.div>

                {/* SUBMIT BUTTON */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      background:
                        'linear-gradient(135deg, #16476A 0%, #BF092F 100%)',
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
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
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <CircularProgress size={20} color='inherit' />
                        <span>Submitting...</span>
                      </Box>
                    ) : (
                      '✓ Submit Lead'
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>

            {/* RIGHT: INFO CARD */}
            <Card
              component={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '16px',
                background:
                  'linear-gradient(135deg, rgba(191, 9, 47, 0.05) 0%, rgba(59, 151, 151, 0.05) 100%)',
                border: '1px solid rgba(191, 9, 47, 0.1)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#132440',
                  mb: 3,
                  letterSpacing: '-0.3px',
                }}
              >
                Why Join Us?
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {[
                  { icon: '🚀', text: 'Access exclusive opportunities' },
                  { icon: '👥', text: 'Connect with industry experts' },
                  { icon: '📈', text: 'Accelerate your career growth' },
                  { icon: '⚡', text: 'Fast-track your success' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <Box
                      sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.5rem',
                          minWidth: '32px',
                          textAlign: 'center',
                        }}
                      >
                        {item.icon}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#7f8c8d',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          lineHeight: 1.5,
                          pt: 0.3,
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Card>
          </Box>

          {/* SUCCESS MODAL */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
              }}
            >
              <Card
                sx={{
                  p: 4,
                  textAlign: 'center',
                  minWidth: { xs: '280px', md: '350px' },
                  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.2)',
                  borderRadius: '16px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '3rem',
                    mb: 2,
                    lineHeight: 1,
                  }}
                >
                  ✓
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#132440',
                    mb: 1,
                    letterSpacing: '-0.5px',
                  }}
                >
                  Success!
                </Typography>
                <Typography
                  sx={{
                    color: '#7f8c8d',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                  }}
                >
                  Thank you for your interest. Our team will contact you shortly
                  with exciting opportunities.
                </Typography>
              </Card>
            </motion.div>
          )}
        </Container>
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
}

export default LeadForm;
