import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import useGetListProvinces from '@/hooks/client/useGetListProvinces';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getListProvinces, getListProvinceCities } from '@/apis/city.api';
import { addAddress, updateAddress } from '@/apis/address.api';
import { useToast } from '@/hooks/useToast';

const AddressForm = ({ currentAddress, setEditMode, refetchAddress }: any) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const data = currentAddress?.data;
  const { data: listProvince } = useGetListProvinces();
  const [listCity, setListCity] = useState<any[]>([]);

  const toast = useToast(dispatch, toggleSnackbar);
  const { mutate: getListCitiesFunc } = useMutation(
    (id: string | number) => getListProvinceCities(id),
    {
      onSuccess: (data: any) => {
        setListCity(data);
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
    name: data?.name ?? '',
    description: data?.description ?? '',
    phone: data?.phone ?? '',
    cityId: data?.cityId.id ?? '',
    provinceId: data?.cityId?.province ?? '',
    submit: null,
  };

  useEffect(() => {
    if (data?.cityId?.province) {
      getListCitiesFunc(data?.cityId?.province);
    }
  }, [data, getListCitiesFunc]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(255, 'Họ và tên tối đa 255 ký tự')
          .required('Họ và tên là bắt buộc'),
        description: Yup.string().required('Địa chỉ cụ thể là bắt buộc'),
        provinceId: Yup.string().required('Tỉnh/Thành phố là bắt buộc'),
        cityId: Yup.string().required('Quận/Huyện là bắt buộc'),
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
            cityId: values.cityId,
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
          {/* provinces */}
          <FormControl
            fullWidth
            error={Boolean(touched.provinceId && errors.provinceId)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="select-city">Tỉnh/Thành phố</InputLabel>

            <Select
              id="select-city"
              value={values.provinceId}
              label="Tỉnh/Thành phố"
              onChange={(event) => {
                getListCitiesFunc(event.target.value);
                setValues((prev) => ({
                  ...prev,
                  provinceId: event.target.value,
                }));
              }}
            >
              {(listProvince || [])?.map((province: any, _index: number) => (
                <MenuItem key={_index} value={province?.id}>
                  {province?.name}
                </MenuItem>
              ))}
            </Select>
            {touched.provinceId && errors.provinceId && (
              <FormHelperText error id="standard-weight-helper-text-cityId">
                {errors.provinceId as any}
              </FormHelperText>
            )}
          </FormControl>
          {/* city  */}
          <FormControl
            disabled={!values?.provinceId}
            fullWidth
            error={Boolean(touched.cityId && errors.cityId)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="select-district">Quận/Huyện</InputLabel>

            <Select
              id="select-district"
              value={values.cityId}
              label="Quận/Huyện"
              onChange={(event) => {
                setValues((prev) => ({
                  ...prev,
                  cityId: event.target.value,
                }));
              }}
            >
              {(listCity || [])?.map((city: any, _index: number) => (
                <MenuItem key={_index} value={city?.id}>
                  {city?.name}
                </MenuItem>
              ))}
            </Select>
            {touched.cityId && errors.cityId && (
              <FormHelperText
                error
                id="standard-weight-helper-text-district_id"
              >
                {errors.cityId as any}
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
