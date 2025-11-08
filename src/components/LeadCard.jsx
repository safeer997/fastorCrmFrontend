import { Card, Box, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LeadCard = ({ lead, onLeadClaimed, isClaimed }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClaimLead = async () => {
    const token = localStorage.getItem('fastorToken');
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://fastorcrmbackend.onrender.com/api/lead/claimlead/${lead._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && onLeadClaimed) {
        onLeadClaimed(lead._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to claim lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -4 }}
      transition={{ duration: 0.2 }}
      sx={{
        p: { xs: 2.5, md: 3 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr) 150px',
          lg: 'repeat(4, 1fr) 180px',
        },
        gap: { xs: 2, md: 2.5 },
        alignItems: 'center',
        border: `2px solid ${isClaimed ? '#BF092F' : '#e8eef2'}`,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          borderColor: '#BF092F',
        },
      }}
    >
      {/* NAME FIELD */}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.7rem',
            color: '#95a5a6',
            textTransform: 'uppercase',
            fontWeight: 600,
            mb: 0.5,
            letterSpacing: '0.5px',
          }}
        >
          Name
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            color: '#132440',
            fontSize: '0.95rem',
            wordBreak: 'break-word',
          }}
        >
          {lead.name}
        </Typography>
      </Box>

      {/* EMAIL FIELD */}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.7rem',
            color: '#95a5a6',
            textTransform: 'uppercase',
            fontWeight: 600,
            mb: 0.5,
            letterSpacing: '0.5px',
          }}
        >
          Email
        </Typography>
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: '#2c3e50',
            wordBreak: 'break-all',
          }}
        >
          {lead.email}
        </Typography>
      </Box>

      {/* COURSE FIELD */}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.7rem',
            color: '#95a5a6',
            textTransform: 'uppercase',
            fontWeight: 600,
            mb: 0.5,
            letterSpacing: '0.5px',
          }}
        >
          Course
        </Typography>
        <Chip
          label={lead.courseInterest}
          size="small"
          sx={{
            background: 'linear-gradient(135deg, #16476A 0%, #3B9797 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 'auto',
            '& .MuiChip-label': {
              px: 1,
              py: 0.5,
            },
          }}
        />
      </Box>

      {/* PHONE FIELD (DESKTOP ONLY) */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '0.7rem',
            color: '#95a5a6',
            textTransform: 'uppercase',
            fontWeight: 600,
            mb: 0.5,
            letterSpacing: '0.5px',
          }}
        >
          Phone
        </Typography>
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: '#2c3e50',
            wordBreak: 'break-all',
          }}
        >
          {lead.phone}
        </Typography>
      </Box>

      {/* BUTTON SECTION - FULL WIDTH ON MOBILE */}
      <Box
        sx={{
          gridColumn: { xs: '1 / -1', md: 'auto' },
          display: 'flex',
          gap: 1,
          width: '100%',
        }}
      >
        {!isClaimed ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%' }}
          >
            <Button
              onClick={handleClaimLead}
              disabled={loading}
              variant="contained"
              fullWidth
              sx={{
                background: loading
                  ? '#ccc'
                  : 'linear-gradient(135deg, #16476A 0%, #BF092F 100%)',
                py: { xs: 1.2, md: 1 },
                px: { xs: 2, md: 1.5 },
                borderRadius: '8px',
                fontSize: { xs: '0.9rem', md: '0.8rem' },
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(191, 9, 47, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(191, 9, 47, 0.3)',
                  background: loading
                    ? '#ccc'
                    : 'linear-gradient(135deg, #16476A 0%, #BF092F 100%)',
                },
                '&:disabled': {
                  background: '#ccc',
                  boxShadow: 'none',
                },
              }}
            >
              {loading ? (
                <span style={{ letterSpacing: '2px' }}>...</span>
              ) : (
                'Claim'
              )}
            </Button>
          </motion.div>
        ) : (
          <Chip
            label="✓ Claimed"
            sx={{
              background: '#BF092F',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              width: '100%',
              height: 'auto',
              py: 1.2,
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />
        )}
      </Box>
    </Card>
  );
};

export default LeadCard;
