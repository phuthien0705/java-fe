import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { updatePassword } from '@/apis/user.api';

type valueType = {
  old_password: string;
  new_password: string;
  re_enter_new_password: string;
};

const SecurityTab: React.FunctionComponent = () => {
  const theme: any = useTheme();

  const initValue: valueType = {
    old_password: '',
    new_password: '',
    re_enter_new_password: '',
  };

  const dispatch = useDispatch();
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
  return (
    <Box sx={{ maxWidth: '500px', margin: 'auto', paddingTop: 2 }}>
      <Formik
        initialValues={initValue}
        validationSchema={Yup.object().shape({
          old_password: Yup.string()
            .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
            .max(255, 'Mật khẩu tối đa 255 ký tự')
            .required('Mật khẩu là bắt buộc'),
          new_password: Yup.string()
            .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
            .max(255, 'Mật khẩu tối đa 255 ký tự')
            .required('Mật khẩu là bắt buộc'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (values.new_password !== values.re_enter_new_password) {
              toast({
                type: 'error',
                message: `Mật khẩu và mật khẩu xác nhận phải giống nhau`,
              });
              return;
            }

            await updatePassword({
              old_password: values.old_password,
              new_password: values.new_password,
            });

            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: 'Cập nhật mật khẩu thành công',
            });
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình cập nhật mật khẩu`,
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
          <form noValidate onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.old_password && errors.old_password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-old_password">
                Mật khẩu cũ
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-old_password"
                type="password"
                value={values.old_password}
                name="old_password"
                onChange={handleChange}
                label=" Mật khẩu cũ"
                inputProps={{}}
              />
              {touched.old_password && errors.old_password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-old_password"
                >
                  {errors.old_password as any}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.new_password && errors.new_password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-new_password">
                Mật khẩu mới
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-new_password"
                type="password"
                value={values.new_password}
                name="new_password"
                onChange={handleChange}
                label="Mật khẩu mới"
                inputProps={{}}
              />
              {touched.new_password && errors.new_password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-new_password"
                >
                  {errors.new_password as any}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(
                touched.re_enter_new_password && errors.re_enter_new_password
              )}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-re_enter_new_password">
                Nhập lại mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-re_enter_new_password"
                type="password"
                value={values.re_enter_new_password}
                name="re_enter_new_password"
                onChange={handleChange}
                label="Nhập lại mật khẩu"
                inputProps={{}}
              />
              {touched.re_enter_new_password &&
                errors.re_enter_new_password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-re_enter_new_password"
                  >
                    {errors.re_enter_new_password as any}
                  </FormHelperText>
                )}
            </FormControl>
            <Stack
              direction="row"
              justifyContent={'flex-start'}
              spacing={1}
              sx={{ mt: 2, mb: 2 }}
            >
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: 'fit-content' }}
              >
                Xác nhận
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default SecurityTab;
