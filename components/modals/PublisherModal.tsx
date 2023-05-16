import { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
import CustomModal from './CustomModal';
import { toggleSnackbar } from '../../store/snackbarReducer';
import { createPublisher, editPublisher } from '../../apis/publisher.api';
import { IModal } from '@/interfaces/compontents/modal.interface';
import objectEquals from '../../common/objectEquals';
import createRequest from '../../common/createRequest';
import ConfirmModal from './ConfirmModal';
import { useQueryClient } from 'react-query';
import { PUBLISHERS } from '@/constants/queryKeyName';

const PublisherModal: FC<IModal> = ({ handleClose, open, currentProduct }) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const data = currentProduct?.data;

  const initialValues = {
    name: data?.name ?? '',
    description: data?.description ?? '',
    address: data?.address ?? '',
    phone: data?.phone ?? '',
    email: data?.email ?? '',
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
            .max(255, 'Tên nhà xuất bản tối đa 255 ký tự')
            .required('Tên nhà xuất bản là bắt buộc'),
          description: Yup.string().max(
            255,
            'Mô tả nhà xuất bản tối đa 255 ký tự'
          ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const req = createRequest({
              name: values.name,
              description: values.description,
              address: values.address,
              phone: values.phone,
              email: values.email,
            });
            if (data === null) {
              await createPublisher(req);
            } else {
              await editPublisher(data?.id, req);
            }
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công`,
            });
            queryClient.refetchQueries([PUBLISHERS]);
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình ${
                data === null ? 'tạo' : 'cập nhật'
              } nhà xuất bản`,
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
          <CustomModal
            open={open}
            handleClose={() => {
              handleExit(values);
            }}
            title={
              data === null ? 'Tạo nhà xuất bản' : 'Chỉnh sửa nhà xuất bản'
            }
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name">
                  Tên nhà xuất bản
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tên nhà xuất bản"
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
                error={Boolean(touched.description && errors.description)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-description">
                  Mô tả nhà xuất bản
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-description"
                  type="text"
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả nhà xuất bản"
                  inputProps={{}}
                />
                {touched.description && errors.description && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-description"
                  >
                    {errors.description as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email">
                  Email nhà xuất bản
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="text"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email nhà xuất bản"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email">
                    {errors.email as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-address">
                  Địa chỉ nhà xuất bản
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-address"
                  type="text"
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Địa chỉ nhà xuất bản"
                  inputProps={{}}
                />
                {touched.address && errors.address && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-address"
                  >
                    {errors.address as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.phone && errors.phone)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-phone">
                  Số điện thoại nhà xuất bản
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  type="text"
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Số điện thoại nhà xuất bản"
                  inputProps={{}}
                />
                {touched.phone && errors.phone && (
                  <FormHelperText error id="standard-weight-helper-text-phone">
                    {errors.phone as any}
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

export default PublisherModal;
