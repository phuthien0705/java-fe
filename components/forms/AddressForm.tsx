import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import useGetListAddress from '@/hooks/client/useGetListAddress';
import useGetListCity from '@/hooks/client/useGetListCity';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getListDistrict } from '@/apis/city.api';
import { addAddress, updateAddress } from '@/apis/address.api';
import { useToast } from '@/hooks/useToast';
import { LoadingButton } from '@mui/lab';

const AddressForm = ({ currentAddress, setEditMode, refetchAddress }: any) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const data = currentAddress?.data;
  const { data: listCity } = useGetListCity();
  const [listDistrict, setListDistrict] = useState<any[]>([]);

  const toast = useToast(dispatch, toggleSnackbar);
  const { mutate: getListDistrictFunc } = useMutation(
    (id: string | number) => getListDistrict(id),
    {
      onSuccess: (data: any) => {
        setListDistrict(data?.city);
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình lấy danh sách quận huyện',
        });
      },
    }
  );
  const { mutate: createAddressFunc, isLoading: isCreating } = useMutation(
    (data: any) => addAddress(data),
    {
      onSuccess: () => {
        refetchAddress();
        toast({
          type: 'success',
          message: `Tạo thành công`,
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình tạo địa chỉ',
        });
      },
    }
  );
  const { mutate: updateAddressFunc, isLoading: isUpdating } = useMutation<
    any,
    Error,
    any,
    { id: string | number; data: any }
  >(
    ({ id, data }: { id: string | number; data: any }) =>
      updateAddress(id, data),
    {
      onSuccess: () => {
        refetchAddress();
        toast({
          type: 'success',
          message: `Cập nhật thành công`,
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình cập nhật địa chỉ',
        });
      },
    }
  );
  const initialValues = {
    name: data?.name ? data?.name : '',
    description: data?.description ? data?.description : '',
    phone: data?.phone ? data?.phone : '',
    district_id: data?.city?.id ? data?.city?.id : '',
    city_id: data?.city?.province_id ? data?.city?.province_id : '',
    submit: null,
  };

  useEffect(() => {
    if (data?.city?.province_id) {
      getListDistrictFunc(data?.city?.province_id);
    }
  }, [data, getListDistrictFunc]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255, 'Họ và tên tối đa 255 ký tự')
          .required('Họ và tên là bắt buộc'),
        description: Yup.string().required('Địa chỉ cụ thể là bắt buộc'),
        city_id: Yup.string().required('Tỉnh/Thành phố là bắt buộc'),
        district_id: Yup.string().required('Quận/Huyện là bắt buộc'),
        phone: Yup.number()
          .required('Số điện thoại là bắt buộc')
          .integer('Số điện thoại phải là số nguyên')
          .typeError('Số điện thoại phải là số nguyên'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values.phone?.length !== 10) {
            toast({ type: 'info', message: 'Số điện thoại phải có 10 ký tư' });
            return;
          }
          const req = {
            name: values.name,
            description: values.description,
            phone: values.phone,
            city_id: values.district_id,
          };

          if (!data) {
            createAddressFunc(req);
          } else {
            updateAddressFunc({ id: data?.id, data: req });
          }

          setStatus({ success: true });
          setSubmitting(false);

          setTimeout(() => {
            setEditMode(false);
          }, 1000);
        } catch (err) {
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
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name">
                  Họ và tên
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tên thể loại"
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText error id="standard-weight-helper-text-name">
                    {errors.name as any}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.phone && errors.phone)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-phone">
                  Số điện thoại
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-phone"
                  type="text"
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.phone && errors.phone && (
                  <FormHelperText error id="standard-weight-helper-text-phone">
                    {errors.phone as any}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          {/* city */}
          <FormControl
            fullWidth
            error={Boolean(touched.city_id && errors.city_id)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="select-city">Tỉnh/Thành phố</InputLabel>

            <Select
              id="select-city"
              value={values.city_id}
              label="Tác giả"
              onChange={(event) => {
                getListDistrictFunc(event.target.value);
                setValues((prev) => ({
                  ...prev,
                  city_id: event.target.value,
                }));
              }}
            >
              {(listCity?.provinces || [])?.map(
                (province: any, _index: number) => (
                  <MenuItem key={_index} value={province?.id}>
                    {province?.name}
                  </MenuItem>
                )
              )}
            </Select>
            {touched.city_id && errors.city_id && (
              <FormHelperText error id="standard-weight-helper-text-city_id">
                {errors.city_id as any}
              </FormHelperText>
            )}
          </FormControl>
          {/* distric  */}
          <FormControl
            disabled={!values?.city_id}
            fullWidth
            error={Boolean(touched.district_id && errors.district_id)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="select-district">Quận/Huyện</InputLabel>

            <Select
              id="select-district"
              value={values.district_id}
              label="Quận/Huyện"
              onChange={(event) => {
                setValues((prev) => ({
                  ...prev,
                  district_id: event.target.value,
                }));
              }}
            >
              {(listDistrict || [])?.map((district: any, _index: number) => (
                <MenuItem key={_index} value={district?.id}>
                  {district?.name}
                </MenuItem>
              ))}
            </Select>
            {touched.district_id && errors.district_id && (
              <FormHelperText
                error
                id="standard-weight-helper-text-district_id"
              >
                {errors.district_id as any}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.description && errors.description)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-description">
              Địa chỉ cụ thể
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-description"
              type="text"
              value={values.description}
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Địa chỉ cụ thể"
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
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Stack
            direction="row"
            justifyContent={'flex-end'}
            spacing={1}
            sx={{ mt: 2, mb: 2 }}
          >
            <Button
              size="large"
              disableElevation
              onClick={() => setEditMode(false)}
              sx={{ width: 'fit-content' }}
            >
              Trở lại
            </Button>
            <LoadingButton
              loading={isCreating || isUpdating}
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: 'fit-content' }}
            >
              {!data ? 'Tạo' : 'Lưu'}
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default AddressForm;
