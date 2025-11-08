import { Box, Typography, Container, Link, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, LinkedIn, Mail } from '@mui/icons-material';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      sx={{
        background: 'linear-gradient(180deg, #0f2d47 0%, #132440 100%)',
        color: '#e8eef2',
        borderTop: '1px solid rgba(191, 9, 47, 0.15)',
        mt: 'auto',
        py: 3,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: { xs: 'center', md: 'left' },
          gap: 2.5,
        }}
      >
        {/* Made with love */}
        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            fontSize: '0.9rem',
            color: '#b0b0b0',
          }}
        >
          Made with <span style={{ color: '#BF092F' }}>❤️</span> by{' '}
          <span style={{ color: '#fff', fontWeight: 600 }}>Safeer Alam</span> ©{' '}
          {year}
        </Typography>

        {/* Social icons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          <Link
            href="https://github.com/safeer997"
            target="_blank"
            rel="noopener"
            sx={{
              color: '#e8eef2',
              '&:hover': { color: '#BF092F' },
              transition: 'all 0.3s ease',
            }}
          >
            <GitHub fontSize="medium" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/safeeralam997/"
            target="_blank"
            rel="noopener"
            sx={{
              color: '#e8eef2',
              '&:hover': { color: '#3B9797' },
              transition: 'all 0.3s ease',
            }}
          >
            <LinkedIn fontSize="medium" />
          </Link>

          <Link
            href="mailto:safeeralam997@gmail.com"
            sx={{
              color: '#e8eef2',
              '&:hover': { color: '#BF092F' },
              transition: 'all 0.3s ease',
            }}
          >
            <Mail fontSize="medium" />
          </Link>
        </Box>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            href="mailto:safeeralam997@gmail.com"
            sx={{
              color: '#fff',
              background:
                'linear-gradient(135deg, #3B9797 0%, #16476A 50%, #132440 100%)',
              borderRadius: '10px',
              px: { xs: 2, md: 3 },
              py: 0.9,
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
              '&:hover': {
                background:
                  'linear-gradient(135deg, #BF092F 0%, #a40725 100%)',
              },
            }}
          >
            💼 Hire / Collaborate
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Footer;
