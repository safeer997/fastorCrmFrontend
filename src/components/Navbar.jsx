import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ showMyLeads, setShowMyLeads }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('fastorToken');
    navigate('/auth');
  };

  const handleToggleMenu = () => setMobileOpen(!mobileOpen);

  const NavButtons = () => (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 2, sm: 1.5 }}
      sx={{
        alignItems: { xs: 'stretch', sm: 'center' },
        textAlign: { xs: 'center', sm: 'left' },
        mt: { xs: 2, sm: 0 },
      }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => {
            navigate('/submitlead');
            setMobileOpen(false);
          }}
          sx={{
            color: '#fff',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '10px',
            px: { xs: 1.8, sm: 2.2 },
            py: { xs: 0.6, sm: 0.8 },
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            fontWeight: 600,
            backdropFilter: 'blur(6px)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
              borderColor: '#fff',
            },
          }}
        >
          + Lead
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => {
            setShowMyLeads(!showMyLeads);
            setMobileOpen(false);
          }}
          sx={{
            color: showMyLeads ? '#fff' : '#e0e8ef',
            background: showMyLeads
              ? 'linear-gradient(90deg, #BF092F 0%, #a40725 100%)'
              : 'transparent',
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: '10px',
            px: { xs: 1.8, sm: 2.2 },
            py: { xs: 0.6, sm: 0.8 },
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            fontWeight: 600,
            '&:hover': {
              bgcolor: showMyLeads ? '#a40725' : 'rgba(255, 255, 255, 0.12)',
            },
          }}
        >
          {showMyLeads ? 'All Leads' : 'My Leads'}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => {
            handleLogout();
            setMobileOpen(false);
          }}
          sx={{
            color: '#fff',
            background: 'linear-gradient(135deg, #BF092F 0%, #a40725 100%)',
            borderRadius: '10px',
            px: { xs: 1.8, sm: 2.2 },
            py: { xs: 0.6, sm: 0.8 },
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            fontWeight: 600,
            boxShadow: '0 3px 10px rgba(191, 9, 47, 0.3)',
            '&:hover': {
              boxShadow: '0 5px 14px rgba(191, 9, 47, 0.5)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Logout
        </Button>
      </motion.div>
    </Stack>
  );

  return (
    <AppBar
      component={motion.header}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        background:
          'linear-gradient(90deg, #132440 0%, #16476A 50%, #3B9797 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 1200,
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            py: 1.2,
            alignItems: 'center',
          }}
        >
          {/* Brand Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/dashboard')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2.2rem' },
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '0.8px',
                textShadow: '0 2px 6px rgba(0,0,0,0.2)',
                lineHeight: 1.1,
              }}
            >
              Fastor<span style={{ color: '#BF092F' }}>CRM</span>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                fontWeight: 400,
                color: '#e0e8ef',
                mt: 0.2,
                letterSpacing: '0.5px',
              }}
            >
              Empowering Smarter Leads 🚀
            </Typography>
          </motion.div>

          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1.5 }}>
            <NavButtons />
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ color: '#fff', display: { xs: 'flex', sm: 'none' } }}
            onClick={handleToggleMenu}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor='top'
        open={mobileOpen}
        onClose={handleToggleMenu}
        PaperProps={{
          sx: {
            background:
              'linear-gradient(180deg, #132440 0%, #16476A 60%, #3B9797 100%)',
            color: '#fff',
            p: 3,
          },
        }}
      >
        <NavButtons />
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
