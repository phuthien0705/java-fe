import { useState, useEffect, MouseEventHandler } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  strengthColor,
  strengthIndicator,
} from '../../utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login, register } from '../../apis/auth.api';
import authService from '../../services/authService';
import { LoadingButton } from '@mui/lab';

const AuthRegisterForm = ({ ...others }: { [others: string]: unknown }) => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState<any>(null);
  const [showAlertCheckMail, setShowAlertCheckMail] = useState<{
    [key: string]: any;
  } | null>(null);

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      {/* <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={googleHandler}
            size="large"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
            }}
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 }, height: '20px' }}>
              <Image
                src={Google}
                alt="google"
                width={16}
                height={16}
                style={{ marginRight: matchDownSM ? 8 : 16 }}
              />
            </Box>
            Đăng ký với Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
              Hoặc
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
            <Typography variant="subtitle1">Đăng ký bằng Email</Typography>
          </Box>
        </Grid>
      </Grid> */}

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email phải đúng địng dạng')
            .max(255, 'Email tối đa 255 ký tự')
            .required('Email là bắt buộc'),
          password: Yup.string()
            .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
            .max(255, 'Mật khẩu tối đa 255 ký tự')
            .required('Mật khẩu là bắt buộc'),
          name: Yup.string()
            .max(255, 'Họ tên tối đa 255 ký tự')
            .required('Họ và tên là bắt buộc'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = {
              name: values.name,
              email: values.email,
              password: values.password,
            };
            await register(req);
            const req2 = { email: values.email, password: values.password };
            const res2: any = await login(req2);
            authService.login({
              accessToken: res2.tokens.access.token,
              name: res2.user.name,
              id: res2.user.id,
              roles: res2.user.roles,
              email: res2.user.email,
            });
            setShowAlertCheckMail({
              type: 'success',
              message:
                'Đăng ký thành công vui lòng kiểm tra Email để kích hoạt tài khoản',
            });
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: any) {
            console.error(err);
            setShowAlertCheckMail({
              type: 'error',
              message: 'Xảy ra lỗi trong quá trình đăng ký.',
            });
            setStatus({ success: false });
            setErrors({ submit: err?.message });
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
              error={Boolean(touched.name && errors.name)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-name-register">
                Họ và Tên
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-register"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
                >
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-register">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text--register"
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
              <InputLabel htmlFor="outlined-adornment-password-register">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid container alignItems="start" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Tôi đồng ý với &nbsp;
                      <Typography style={{ display: 'inline-block' }}>
                        Điều khoản dịch vụ & Chính sách bảo mật
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
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
                Đăng ký
              </LoadingButton>
              {!!showAlertCheckMail && (
                <Alert
                  sx={{ marginTop: 2 }}
                  severity={showAlertCheckMail?.type}
                  color={
                    showAlertCheckMail?.type === 'success' ? 'info' : 'error'
                  }
                  onClose={() => setShowAlertCheckMail(null)}
                >
                  {showAlertCheckMail.message}
                </Alert>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegisterForm;
