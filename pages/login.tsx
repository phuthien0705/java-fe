import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import AuthCardWrapper from '../components/auth/AuthCardWrapper';
import AuthLayout from '../layout/AuthLayout/index';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthLoginForm from '../components/forms/AuthLoginForm';
import LogoSection from '@/components/LogoSection';

const LoginPage = () => {
  const intl = useIntl();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const title = intl.formatMessage({ id: 'page.login.head.title' });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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
                <Grid
                  item
                  sx={{
                    m: { xs: theme.spacing(1), sm: theme.spacing(3) },
                    mb: 0,
                  }}
                >
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
                                {<FormattedMessage id="page.login.title" />}
                              </Typography>
                              <Typography
                                variant="caption"
                                fontSize="16px"
                                textAlign={matchDownSM ? 'center' : 'inherit'}
                              >
                                {<FormattedMessage id="page.login.content1" />}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <AuthLoginForm />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          item
                          container
                          direction="column"
                          alignItems="center"
                          xs={12}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ textDecoration: 'none' }}
                          >
                            {
                              <FormattedMessage id="page.login.registerContent1" />
                            }{' '}
                            <Link href="/register">
                              <Typography
                                style={{ display: 'inline-block' }}
                                color="secondary"
                              >
                                {
                                  <FormattedMessage id="page.login.registerContent2" />
                                }
                                .
                              </Typography>
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </AuthCardWrapper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AuthWrapper>
      </AuthLayout>
    </>
  );
};

export default LoginPage;
