import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthLayout from '../layout/AuthLayout/index';
import AuthCardWrapper from '../components/auth/AuthCardWrapper';
import Logo from '../components/Logo';
import AuthWrapper from '../components/auth/AuthWrapper';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

const ResetPassword = () => {
  const router = useRouter();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AuthLayout>
      {' '}
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
                              Đặt lại mật khẩu
                            </Typography>
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={matchDownSM ? 'center' : 'inherit'}
                            >
                              Nhập các thông tin bên dưới để tiếp hành đặt lại
                              mật khẩu
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <ResetPasswordForm
                        params={`?token=${router?.query?.token}`}
                      />
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

export default ResetPassword;
