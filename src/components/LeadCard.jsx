import { Card, Box, Typography, Button, Chip } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const LeadCard = ({ lead, onLeadClaimed, isClaimed }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getButtonStatus() {
    if (isClaimed === true) {
      return 'Claimed by You';
    } else {
      return 'Claim Lead';
    }
  }

  function getButtonColor() {
    if (isClaimed === true) {
      return 'success';
    } else {
      return 'primary';
    }
  }

  async function handleClaimLead() {
    console.log('Lead ID:', lead._id);

    const token = localStorage.getItem('fastorToken');

    if (!token) {
      console.log('Token not found');
      toast.error('Please login first');
      navigate('/auth');
    }

    try {
      setLoading(true);
      console.log('Loading state set to true');

      const response = await axios.post(
        `http://localhost:7300/api/lead/claimlead/${lead._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const successStatus = response.data.success;
      const successMessage = response.data.message;
      console.log('Success status:', successStatus);
      console.log('Success message:', successMessage);

      if (successStatus === true) {
        console.log('Lead claimed successfully');
        toast.success(successMessage);

        if (onLeadClaimed) {
          onLeadClaimed(lead._id);
        }
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
    <Card sx={{ p: 2, mb: 2, boxShadow: 1, border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='h6'>{lead.name}</Typography>

        <Chip
          label={isClaimed === true ? 'Claimed' : 'Unclaimed'}
          color={isClaimed === true ? 'success' : 'default'}
          size='small'
        />
      </Box>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
        Email: {lead.email}
      </Typography>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
        Phone: {lead.phone}
      </Typography>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Course Interest: {lead.courseInterest}
      </Typography>

      {isClaimed === false && (
        <Button
          variant='contained'
          color={getButtonColor()}
          fullWidth
          onClick={handleClaimLead}
          disabled={loading}
        >
          {loading === true && 'Claiming...'}
          {loading === false && getButtonStatus()}
        </Button>
      )}

      {isClaimed === true && (
        <Button variant='contained' color={getButtonColor()} fullWidth disabled>
          {getButtonStatus()}
        </Button>
      )}
    </Card>
  );
};

export default LeadCard;
