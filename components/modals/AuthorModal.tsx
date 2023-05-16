import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  useTheme,
  Alert,
  Button,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState, FC } from 'react';
import CustomModal from './CustomModal';
import objectEquals from '../../common/objectEquals';
import ConfirmModal from './ConfirmModal';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import { createAuthor, editAuthor } from '../../apis/author.api';
import createRequest from '../../common/createRequest';
import { IModal } from '@/interfaces/compontents/modal.interface';
import { useQueryClient } from 'react-query';
import { AUTHORS } from '@/constants/queryKeyName';

const AuthorModal: FC<IModal> = ({ handleClose, open, currentProduct }) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const data = currentProduct?.data;

  const initialValues = {
    name: data?.name ?? '',
    biography: data?.biography ?? '',
    birthDate: data?.birthDate ?? '',
    deathDate: data?.deathDate ?? '',
    submit: null,
  };
  const handleExit = (currentValues: any) => {
    if (objectEquals(initialValues, currentValues)) {
      handleClose();
    } else {
      setShowConfirm(true);
    }
  };
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
  return open ? (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(255, 'Tên tác giả tối đa 255 ký tự')
            .required('Tên tác giả là bắt buộc'),
          biography: Yup.string().max(255, 'Tiểu sử tác giả tối đa 255 ký tự'),
          birthDate: Yup.string().max(
            255,
            'Ngày sinh tác giả tối đa 255 ký tự'
          ),
          deathDate: Yup.string().max(255, 'Ngày mất tác giả tối đa 255 ký tự'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = createRequest({
              name: values.name,
              biography: values.biography,
              birthDate: values.birthDate,
              deathDate: values.deathDate,
            });
            if (data === null) {
              await createAuthor(req);
            } else {
              await editAuthor(data?.id, req);
            }
            queryClient.refetchQueries([AUTHORS]);
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công`,
            });
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình ${
                data === null ? 'tạo' : 'cập nhật'
              } thể tác giả`,
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
          setValues,
        }) => (
          <CustomModal
            open={open}
            handleClose={() => {
              handleExit(values);
            }}
            title={data === null ? 'Tạo tác giả' : 'Chỉnh sửa tác giả'}
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name">
                  Tên tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tên tác giả"
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="standard-weight-helper-text-name">
                    {errors.name as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.biography && errors.biography)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-biography">
                  Tiểu sử tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-biography"
                  type="text"
                  value={values.biography}
                  name="biography"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tiểu sử tác giả"
                  inputProps={{}}
                />
                {touched.biography && errors.biography && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-biography"
                  >
                    {errors.biography as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.birthDate && errors.birthDate)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel
                  className="date"
                  htmlFor="outlined-adornment-birthDate"
                >
                  Ngày sinh tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-birthDate"
                  type="date"
                  value={values.birthDate}
                  name="birthDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Ngày sinh tác giả"
                  inputProps={{}}
                />
                {touched.birthDate && errors.birthDate && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-birthDate"
                  >
                    {errors.birthDate as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.deathDate && errors.deathDate)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel
                  className="date"
                  htmlFor="outlined-adornment-deathDate"
                >
                  Ngày mất tác giả
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-deathDate"
                  type="date"
                  value={values.deathDate}
                  name="deathDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Ngày sinh tác giả"
                  inputProps={{}}
                />
                {touched.deathDate && errors.deathDate && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-deathDate"
                  >
                    {errors.deathDate as any}
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
                  color="primary"
                >
                  {data === null ? 'Tạo' : 'Lưu'}
                </Button>
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
          </CustomModal>
        )}
      </Formik>
      <ConfirmModal
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        handleConfirm={() => {
          setShowConfirm(false);
          handleClose();
        }}
      />
    </>
  ) : null;
};

export default AuthorModal;
