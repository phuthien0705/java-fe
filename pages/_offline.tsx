import { Box, Typography } from '@mui/material';
import React from 'react';
import BackableLayout from '../layout/backable/BackableLayout';

const OfflinePage = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '32px',
          marginTop: '40px',
          marginBottom: '40px',
        }}
      >
        Oops...{' '}
      </Typography>
      <Typography sx={{ fontSize: '18px' }}>
        Có vẻ như bạn đang bị mất kết nối mạng. Hãy tìm một mạng WiFi/4G ở gần
        nhất và quay lại với chúng mình nhé!
      </Typography>
    </Box>
  );
};

export default OfflinePage;

OfflinePage.getLayout = (_page: any) => {
  return (
    <BackableLayout>
      <OfflinePage />
    </BackableLayout>
  );
};
