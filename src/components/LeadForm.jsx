import React from 'react';
import { Card, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseInterest, setCourseInterest] = useState('');
  const [loading, setLoading] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  function handleCourseChange(e) {
    setCourseInterest(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitLead();
  }

  async function submitLead() {
    console.log('submitLead function called');
    const leadData = {
      name: name,
      email: email,
      phone: phone,
      courseInterest: courseInterest,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        'https://fastorcrmbackend.onrender.com/api/lead/createlead',
        leadData
      );
      console.log('response:', response);

      const successStatus = response.data.success;
      const successMessage = response.data.message;

      if (successStatus === true) {
        console.log('Lead submitted successfully');
        toast.success(successMessage);

        setName('');
        setEmail('');
        setPhone('');
        setCourseInterest('');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      console.log('Error message:', errorMessage);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <ToastContainer position='top-center' autoClose={2000} />
      <Card sx={{ p: 3, mb: 3, boxShadow: 2 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Kindly Fill Your Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label='Name'
            name='name'
            fullWidth
            margin='normal'
            required
            value={name}
            onChange={handleNameChange}
          />

          <TextField
            label='Email'
            name='email'
            fullWidth
            margin='normal'
            required
            type='email'
            value={email}
            onChange={handleEmailChange}
          />

          <TextField
            label='Phone'
            name='phone'
            fullWidth
            margin='normal'
            required
            value={phone}
            onChange={handlePhoneChange}
          />

          <TextField
            label='Course Interest'
            name='courseInterest'
            fullWidth
            margin='normal'
            required
            value={courseInterest}
            onChange={handleCourseChange}
          />

          <Button
            fullWidth
            type='submit'
            variant='contained'
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading === true && 'Submitting...'}
            {loading === false && 'Submit Lead'}
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default LeadForm;
