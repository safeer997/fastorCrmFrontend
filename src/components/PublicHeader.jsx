import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PublicHeader = ({
  title = 'Fastor CRM',
  tagline = 'Empowering Smarter Leads 🚀',
  showLogin = true,
}) => {
  const navigate = useNavigate();

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
          {/* LOGO / BRAND SECTION */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.9rem' },
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
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                fontWeight: 400,
                color: '#e0e8ef',
                mt: 0.2,
                letterSpacing: '0.5px',
              }}
            >
              {tagline}
            </Typography>
          </motion.div>

          {/* LOGIN BUTTON */}
          {showLogin && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate('/auth')}
                  sx={{
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderRadius: '10px',
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.6, sm: 0.8 },
                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    fontWeight: 600,
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: '#fff',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicHeader;
