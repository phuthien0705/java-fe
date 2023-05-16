import { MouseEventHandler, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from './../../assets/images/icons/social-google.svg';
import config from '../../config';
import { forgotPassword, login, resetPassword } from '../../apis/auth.api';
import { useRouter } from 'next/router';

const ResetPasswordForm = ({
  params,
  ...others
}: {
  params: string | undefined;
  [others: string]: unknown;
}) => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showAlert, setShowAlert] = useState<{ [key: string]: any } | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const router = useRouter();
  const handleClickShowPassword = () => {
    setShowPassword((i) => !i);
  };
  const handleMouseDownPassword: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
  };
  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation((i) => !i);
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          password_confirmation: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email phải đúng định dạng')
            .max(255, 'Email tối đa 255 ký tự')
            .required('Email là bắt buộc'),
          password: Yup.string()
            .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
            .max(255, 'Mật khẩu tối đa 255 ký tự')
            .required('Mật khẩu là bắt buộc'),
          password_confirmation: Yup.string()
            .min(8, 'Nhập lại mật khẩu phải ít nhất 8 ký tự')
            .max(255, 'Nhập lại mật khẩu tối đa 255 ký tự')
            .required('Nhập lại mật khẩu là bắt buộc'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          if (values.password !== values.password_confirmation) {
            setShowAlert({
              type: 'error',
              content: 'Mật khẩu và mật khẩu nhập lại phải trùng nhau.',
            });
            setStatus({ success: true });
            setSubmitting(false);
            return;
          }
          try {
            const req = {
              email: values.email,
              password: values.password,
              password_confirmation: values.password_confirmation,
            };
            const res = await resetPassword(params, req);
            setShowAlert({
              type: 'success',
              content:
                'Đặt lại mật khẩu thành công, bạn sẽ được chuyển về trang đăng nhập sau 3 giây.',
            });
            setStatus({ success: true });
            setSubmitting(false);
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          } catch (err: any) {
            console.error(err);
            setShowAlert({
              type: 'error',
              content: 'Xảy ra lỗi trong quá trình đặt lại mật khẩu.',
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
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email"
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
                Mật khẩu
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
                label="Mật khẩu"
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
            <FormControl
              fullWidth
              error={Boolean(
                touched.password_confirmation && errors.password_confirmation
              )}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password_confirmation-login">
                Nhập lại mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password_confirmation-login"
                type={showPasswordConfirmation ? 'text' : 'password'}
                value={values.password_confirmation}
                name="password_confirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirmation}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Nhập lại mật khẩu"
                inputProps={{}}
              />
              {touched.password_confirmation &&
                errors.password_confirmation && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {errors.password_confirmation}
                  </FormHelperText>
                )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Gửi email
              </Button>

              {!!showAlert && (
                <Alert
                  sx={{ marginTop: 2 }}
                  severity={showAlert?.type.toString()}
                  color={
                    showAlert?.type.toString() === 'success' ? 'info' : 'error'
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
ResetPasswordForm.propTypes = {
  params: PropTypes.any,
};
export default ResetPasswordForm;
