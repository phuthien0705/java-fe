import { useEffect, useState, useCallback } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthLayout from '../../../../../layout/AuthLayout/index';
import AuthWrapper from '../../../../../components/auth/AuthWrapper';
import { verifyEmail } from '../../../../../apis/auth.api';
import Logo from '../../../../../components/Logo';
import AuthCardWrapper from '../../../../../components/auth/AuthCardWrapper';

const VerifyPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState('');

  const handleVerifyPassword = useCallback(async () => {
    const startIndex = window.location.href.indexOf('/verify');
    const param = window.location.href.slice(startIndex).replace('/verify', '');
    setLoading(true);
    try {
      const res: any = await verifyEmail(param);

      if (res?.message === 'Already verified') {
        setShowAlert('verified');
      } else {
        setShowAlert('success');
      }

      setLoading(false);
      setTimeout(() => router.push({ pathname: '/' }), 3000);
    } catch (error) {
      setLoading(false);
      setShowAlert('error');
    }
  }, [router]);
  useEffect(() => {
    handleVerifyPassword();
  }, [handleVerifyPassword]);
  return (
    <AuthLayout>
      {' '}
      <>
        {loading && <LinearProgress />}
        <AuthWrapper>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{ minHeight: '100vh' }}
          >
            <Grid item xs={12}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '100vh' }}
              >
                <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                  <AuthCardWrapper>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item sx={{ mb: 3 }}>
                        <Link href="/">
                          <Logo />
                        </Link>
                      </Grid>
                      {loading && (
                        <Grid item xs={12}>
                          <Box
                            sx={{ display: 'flex', justifyContent: 'center' }}
                          >
                            <CircularProgress />
                          </Box>
                        </Grid>
                      )}{' '}
                      {showAlert === 'success' && (
                        <Grid item xs={12}>
                          {' '}
                          <Stack
                            direction="column"
                            justifyContent={'center'}
                            alignItems={'center'}
                            spacing={2}
                            sx={{ width: '100%' }}
                          >
                            <Alert
                              severity="success"
                              color="info"
                              onClose={() => setShowAlert('')}
                            >
                              Xác thực Email thành công. Bạn sẽ được chuyển đến
                              trang chủ sau 3 giây.
                            </Alert>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                router.push({ pathname: '/login' });
                              }}
                            >
                              Đi đến đăng nhập
                            </Button>
                          </Stack>
                        </Grid>
                      )}
                      {showAlert === 'verified' && (
                        <Grid item xs={12}>
                          {' '}
                          <Stack
                            direction="column"
                            justifyContent={'center'}
                            alignItems={'center'}
                            spacing={2}
                            sx={{ width: '100%' }}
                          >
                            <Alert
                              severity="success"
                              color="info"
                              onClose={() => setShowAlert('')}
                            >
                              Email đã được xác thực. Bạn sẽ được chuyển đến
                              trang đăng nhập sau 3 giây.
                            </Alert>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                router.push('/login');
                              }}
                            >
                              Đi đến đăng nhập
                            </Button>
                          </Stack>
                        </Grid>
                      )}
                      {showAlert === 'error' && (
                        <Grid item xs={12}>
                          {' '}
                          <Alert
                            sx={{ marginTop: 2 }}
                            severity="error"
                            color="error"
                            onClose={() => setShowAlert('')}
                          >
                            Xảy ra lỗi trong quá trình xác thực.
                          </Alert>
                        </Grid>
                      )}
                    </Grid>
                  </AuthCardWrapper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AuthWrapper>
      </>
    </AuthLayout>
  );
};

export default VerifyPassword;
