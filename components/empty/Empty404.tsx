import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const Empty404: React.FunctionComponent = () => {
  const router = useRouter();
  const handleClickRedirectToHome = useCallback(() => {
    router.isReady && router.push({ pathname: '/' });
  }, [router]);

  return (
    <Grid
      container
      spacing={2}
      className="shadow"
      sx={{ width: 'fit-content', borderRadius: '8px', pb: 2 }}
    >
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          Opp... {':('}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Trang bạn đang tìm hiện không tôn tại.{' '}
          <Typography
            onClick={handleClickRedirectToHome}
            color="primary"
            sx={{ mt: 1, cursor: 'pointer' }}
          >
            Quay lại trang chủ
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Empty404;
