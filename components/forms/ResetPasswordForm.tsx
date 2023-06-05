import { useRouter } from 'next/router';
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
import { resetPassword } from '../../apis/auth.api';

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
          password: Yup.string()
            .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
            .max(255, 'Mật khẩu tối đa 255 ký tự')
            .required('Mật khẩu là bắt buộc'),
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
              password: values.password,
            };
            await resetPassword(params ?? '', req);
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
