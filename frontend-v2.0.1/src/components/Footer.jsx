// footer component
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';


const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="body1" sx={{ textAlign: 'center' }}>

        {isMobile ? (
            <>
            <p variant="h6" sx={{ textAlign: 'center' }}> Services</p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </>
                  ) : (
                    <>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </>
                  ) };

      </Typography>
    </Box>

)}

export default Footer;
