import React from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeadCard from '../components/LeadCard';

const Dashboard = () => {
  const [showMyLeads, setShowMyLeads] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('fastorToken');
      if (!token) {
        console.log('Token not found, navigating to auth');
        navigate('/auth');
      }
    }
    checkToken();
  }, [navigate]);

  useEffect(() => {
    console.log('leads changed:', showMyLeads);
    if (showMyLeads === true) {
      fetchMyLeads();
    } else {
      fetchAllLeads();
    }
  }, [showMyLeads]);

  async function fetchAllLeads() {
    const token = localStorage.getItem('fastorToken');

    try {
      setLoading(true);
      const response = await axios.get(
        'https://fastorcrmbackend.onrender.com/api/lead/unclaimed',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(' response:', response);
      const successStatus = response.data.success;
      const leadsData = response.data.data;
      console.log('leads data:', leadsData);

      if (successStatus === true) {
        console.log('All leads fetched successfully');
        setAllLeads(leadsData);
      }
    } catch (error) {
      console.log('Fetch all leads error:', error);

      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      console.log('Error message:', errorMessage);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMyLeads() {
    const token = localStorage.getItem('fastorToken');
    try {
      setLoading(true);
      const response = await axios.get(
        'https://fastorcrmbackend.onrender.com/api/lead/userleads',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Fetching my leads :', response);
      const successStatus = response.data.success;
      const leadsData = response.data.data;
      console.log('Success status:', successStatus);
      console.log('Leads data:', leadsData);

      if (successStatus === true) {
        setMyLeads(leadsData);
      }
    } catch (error) {
      console.log('Fetch my leads error:', error);
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      console.log('Error message:', errorMessage);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function handleLeadClaimed(leadId) {
    console.log('Lead ID claimed:', leadId);

    const updatedAllLeads = allLeads.filter(function (lead) {
      return lead._id !== leadId;
    });
    setAllLeads(updatedAllLeads);
    toast.success('Lead claimed successfully!');
    fetchMyLeads();
  }

  function getLeadsToDisplay() {
    if (showMyLeads === true) {
      return myLeads;
    } else {
      return allLeads;
    }
  }

  function getDisplayTitle() {
    if (showMyLeads === true) {
      return 'My Claimed Leads';
    } else {
      return 'All Unclaimed Leads';
    }
  }

  const leadsToDisplay = getLeadsToDisplay();
  const displayTitle = getDisplayTitle();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f4f6f8' }}>
      <ToastContainer position='top-center' autoClose={2000} />

      <Navbar showMyLeads={showMyLeads} setShowMyLeads={setShowMyLeads} />

      <Container maxWidth='md' sx={{ py: 4 }}>
        <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
          {displayTitle}
        </Typography>

        {loading === true && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {loading === false && leadsToDisplay.length === 0 && (
          <Typography variant='body1' color='text.secondary' sx={{ py: 5 }}>
            No leads found
          </Typography>
        )}

        {loading === false &&
          leadsToDisplay.length > 0 &&
          leadsToDisplay.map(function (lead) {
            const isClaimed = showMyLeads === true;
            return (
              <LeadCard
                key={lead._id}
                lead={lead}
                onLeadClaimed={handleLeadClaimed}
                isClaimed={isClaimed}
              />
            );
          })}
      </Container>
    </Box>
  );
};

export default Dashboard;
