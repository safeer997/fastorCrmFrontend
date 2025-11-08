import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeadCard from '../components/LeadCard';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [showMyLeads, setShowMyLeads] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('fastorToken');
    if (!token) navigate('/auth');
  }, [navigate]);

  useEffect(() => {
    showMyLeads ? fetchMyLeads() : fetchAllLeads();
  }, [showMyLeads]);

  const fetchAllLeads = async () => {
    const token = localStorage.getItem('fastorToken');
    try {
      setLoading(true);
      const response = await axios.get(
        'https://fastorcrmbackend.onrender.com/api/lead/unclaimed',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) setAllLeads(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyLeads = async () => {
    const token = localStorage.getItem('fastorToken');
    try {
      setLoading(true);
      const response = await axios.get(
        'https://fastorcrmbackend.onrender.com/api/lead/userleads',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) setMyLeads(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleLeadClaimed = (leadId) => {
    setAllLeads(allLeads.filter((lead) => lead._id !== leadId));
    toast.success('✓ Lead claimed successfully!');
    fetchMyLeads();
  };

  const leadsToDisplay = showMyLeads ? myLeads : allLeads;
  const displayTitle = showMyLeads ? 'My Claimed Leads' : 'Available Leads';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar showMyLeads={showMyLeads} setShowMyLeads={setShowMyLeads} />

      <Box
        sx={{
          flex: 1,
          background: 'linear-gradient(180deg, #f5f7fa 0%, #f0f2f5 100%)',
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  fontWeight: 700,
                  color: '#132440',
                  mb: 1,
                }}
              >
                {displayTitle}
              </Typography>
              <Typography sx={{ color: '#7f8c8d', fontSize: '0.95rem' }}>
                {leadsToDisplay.length} lead{leadsToDisplay.length !== 1 ? 's' : ''} available
              </Typography>
            </Box>
          </motion.div>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress sx={{ color: '#16476A' }} size={50} />
            </Box>
          ) : leadsToDisplay.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  py: 10,
                  bgcolor: '#fff',
                  borderRadius: '16px',
                  border: '1px solid #e8eef2',
                }}
              >
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#132440', mb: 1 }}>
                  {showMyLeads ? 'No claimed leads' : 'No available leads'}
                </Typography>
                <Typography sx={{ color: '#7f8c8d', mb: 3 }}>
                  {showMyLeads ? 'Start claiming leads now' : 'Check back soon'}
                </Typography>
                {showMyLeads && (
                  <Button
                    onClick={() => setShowMyLeads(false)}
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #16476A 0%, #BF092F 100%)',
                    }}
                  >
                    View All Leads
                  </Button>
                )}
              </Box>
            </motion.div>
          ) : (
            <AnimatePresence>
              <Box sx={{ display: 'grid', gap: 2 }}>
                {leadsToDisplay.map((lead, i) => (
                  <motion.div
                    key={lead._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <LeadCard
                      lead={lead}
                      onLeadClaimed={handleLeadClaimed}
                      isClaimed={showMyLeads}
                    />
                  </motion.div>
                ))}
              </Box>
            </AnimatePresence>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Dashboard;
