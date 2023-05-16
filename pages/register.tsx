import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import AuthCardWrapper from '../components/auth/AuthCardWrapper';
import AuthRegisterForm from '../components/forms/AuthRegisterForm';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthLayout from '../layout/AuthLayout/index';
import LogoSection from '@/components/LogoSection';

const RegisterPage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AuthLayout>
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
                    <Grid item sx={{ mb: 1 }}>
                      <LogoSection />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={matchDownSM ? 'column-reverse' : 'row'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                          >
                            <Typography
                              color={theme.palette.secondary.main}
                              gutterBottom
                              variant={matchDownSM ? 'h3' : 'h2'}
                            >
                              Đăng ký
                            </Typography>
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={matchDownSM ? 'center' : 'inherit'}
                            >
                              Nhập thông tin đăng nhập để tiếp tục
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthRegisterForm />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{ textDecoration: 'none', display: 'inline-block' }}
                      >
                        Bạn đã có tài khoản rồi? Đi đến{'  '}
                        <Link href="/login">
                          <Typography
                            style={{ display: 'inline-block' }}
                            color="secondary"
                          >
                            đăng nhập.
                          </Typography>
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper>
    </AuthLayout>
  );
};

export default RegisterPage;
