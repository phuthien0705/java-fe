import { MouseEventHandler, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { login, postLoginGoogle, reSendVerifyEmail } from '../../apis/auth.api';
import authService from '../../services/authService';
import checkIsAdminOrManager from '../../common/checkIsAdminOrManager';
import config from '@/config';
import { useToast } from '@/hooks/useToast';
import { toggleSnackbar } from '@/store/snackbarReducer';

const AuthLoginForm = ({ ...others }: { [others: string]: unknown }) => {
  const theme: any = useTheme();
  const intl = useIntl();
  const router = useRouter();
  const matches = useMediaQuery('(min-width:400px)');
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState<any>(null);

  const localeContent = {
    emailOrPasswordIncorrect: intl.formatMessage({
      id: 'page.login.emailOrPasswordIncorrect',
    }),
    email: intl.formatMessage({ id: 'page.login.email' }),
    password: intl.formatMessage({ id: 'page.login.password' }),
    unActiveAccount: intl.formatMessage({ id: 'page.login.unActiveAccount' }),
    rememberLogin: intl.formatMessage({ id: 'page.login.rememberLogin' }),
    googleError: intl.formatMessage({ id: 'page.login.googleError' }),
    emailValidation: intl.formatMessage({ id: 'page.login.emailValidation' }),
    emailMaxChar: intl.formatMessage({ id: 'page.login.emailMaxChar' }),
    emailRequired: intl.formatMessage({ id: 'page.login.emailRequired' }),
    passwordMinChar: intl.formatMessage({ id: 'page.login.passwordMinChar' }),
    passwordMaxChar: intl.formatMessage({ id: 'page.login.passwordMaxChar' }),
    passwordRequired: intl.formatMessage({ id: 'page.login.passwordRequired' }),
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const result: any = await postLoginGoogle({
        accessToken: tokenResponse.access_token,
      });
      authService.login({
        accessToken: result.tokens.access.token,
        name: result.user.name,
        id: result.user.id,
        roles: result.user.roles,
        email: result.user.email,
      });
      if (!checkIsAdminOrManager(result?.user?.roles)) {
        router.push('/');
      } else {
        router.push('/admin/statistic');
      }
    },
    onError: () => {
      toast({ type: 'error', message: localeContent.googleError });
    },
  });

  const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            onClick={() => loginGoogle()}
            disableElevation
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
              display: 'flex',
            }}
          >
            <GoogleIcon sx={{ marginRight: '8px' }} />
            {<FormattedMessage id="page.login.googleContent" />}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,

                borderRadius: `${config.borderRadius}px`,
              }}
              disableRipple
              disabled
            >
              {<FormattedMessage id="page.login.content2" />}
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              {<FormattedMessage id="page.login.content3" />}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(localeContent.emailValidation)
            .max(255, localeContent.emailMaxChar)
            .required(localeContent.emailRequired),
          password: Yup.string()
            .min(8, localeContent.passwordMinChar)
            .max(255, localeContent.passwordMaxChar)
            .required(localeContent.passwordRequired),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = { email: values.email, password: values.password };
            const res: any = await login(req);
            authService.login({
              accessToken: res.tokens.access.token,
              name: res.user.name,
              id: res.user.id,
              roles: res.user.roles,
              email: res.user.email,
            });
            if (!res.user.isActive) {
              await reSendVerifyEmail();
              setShowAlert({
                type: 'success',
                content: localeContent.unActiveAccount,
              });
              // authService.logOut();
              setStatus({ success: true });
              setSubmitting(false);
              return;
            }
            setStatus({ success: true });
            setSubmitting(false);
            if (!checkIsAdminOrManager(res?.user?.roles)) {
              router.push('/');
            } else {
              router.push('/admin/statistic');
            }
          } catch (err) {
            console.error(err);
            setShowAlert({
              type: 'error',
              content: localeContent.emailOrPasswordIncorrect,
            });
            setStatus({ success: false });

            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                {localeContent.email}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label={localeContent.email}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                {localeContent.password}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={localeContent.password}
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction={matches ? 'row' : 'column'}
              alignItems={matches ? 'center' : 'flex-start'}
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label={localeContent.rememberLogin}
              />
              <Typography
                onClick={() => router.push('/forgot-password')}
                variant="subtitle1"
                color="secondary"
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontWeight: 500,
                  width: !matches ? '100% !important' : 'fit-content',
                  textAlign: 'right',
                }}
              >
                {<FormattedMessage id="page.login.forgotPassword" />}
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: theme.spacing(3) }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <LoadingButton
                disableElevation
                loading={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                <FormattedMessage id={'page.login.title'} />
              </LoadingButton>

              {!!showAlert && (
                <Alert
                  sx={{ marginTop: 2 }}
                  severity={showAlert?.type.toString()}
                  color={
                    showAlert?.type.toString() === 'success'
                      ? 'info'
                      : showAlert?.type.toString()
                  }
                  onClose={() => setShowAlert(null)}
                >
                  {showAlert?.content}
                </Alert>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLoginForm;
