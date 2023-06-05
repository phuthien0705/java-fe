import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  useTheme,
  Alert,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState, FC, useContext } from 'react';
import { useDispatch } from 'react-redux';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CustomModal from './CustomModal';
import objectEquals from '../../common/objectEquals';
import ConfirmModal from './ConfirmModal';
import { toggleSnackbar } from '../../store/snackbarReducer';
import createFormDataRequest from '../../common/createFormDataRequest';
import { createBook, editBook } from '../../apis/product.api';
import { IBookModal } from '@/interfaces/compontents/modal.interface';
import { resizeImage } from '@/utils/fileUtils';
import { TDataImage } from './PreviewImageModal';
import { ListImage } from '../swiper/ListImage';
import { MainContext } from '@/pages/_app';
import { deepClone } from '@/common/deepClone';
import dayjs from 'dayjs';

const OrderModal: FC<IBookModal> = ({
  handleClose,
  open,
  currentProduct,
  refetchAfterClose,
  authors,
  genres,
  publishers,
  findAuthor,
  findGenre,
  findPublisher,
}) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState<any>(false);
  const [image, setImage] = useState<string[] | null>(null);
  const { setBackdrop } = useContext(MainContext);
  const data = currentProduct?.data;

  const initialValues = {
    name: data?.name ?? '',
    description: data?.description ?? '',
    availableQuantity: data?.availableQuantity ?? '',
    isbn: data?.isbn ?? '',
    language: 'vn',
    totalPages: data?.totalPages ?? '',
    price: data?.price ?? '',
    priceDiscount: data?.priceDiscount ?? '',
    images: data?.images
      ? data?.images.map((image: TDataImage) => image.url)
      : null,
    publishedDate: data?.publishedDate
      ? dayjs(data?.publishedDate).format('YYYY-MM-DD')
      : '',
    publisherId: data?.publisherId ?? '',
    genres: data?.genres ? data?.genres?.map((item: any) => item?.id) : [],
    authors: data?.authors ? data?.authors?.map((item: any) => item?.id) : [],
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
  const onSelectImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValues: Function
  ) => {
    const promises: Promise<string>[] = [];
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const numberOfImage: number = Object.keys(fileList).length;
      if (numberOfImage > 15) {
        toast({
          type: 'warning',
          message: 'Bạn có thể chọn tối đa 15 ảnh',
        });
        return;
      }
      setBackdrop(true);
      for (let key in fileList) {
        // the object is {File: 1, File: 2, length: 2, item: ...} so we need to skip loops where key is not number
        if (isNaN(parseFloat(key))) {
          continue;
        }
        promises.push(resizeImage(fileList[key]));
      }
      Promise.all(promises)
        .then((result) => {
          setBackdrop(false);
          setImage(result);
          setValues((prev: any) => ({
            ...prev,
            images: result,
          }));
        })
        .catch(() => {
          setBackdrop(false);
        });
    }
  };
  return open ? (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(255, 'Tên sách tối đa 255 ký tự')
            .required('Tên sách là bắt buộc'),
          description: Yup.string(),
          availableQuantity: Yup.number()
            .integer('Số lượng sách phải là số nguyên')
            .typeError('Số lượng sách phải là số nguyên'),
          isbn: Yup.string().max(20, 'Mã sách tối đa 20 ký tự'),
          totalPages: Yup.number()
            .integer('Số trang phải là số nguyên')
            .typeError('Số trang phải là số nguyên'),
          price: Yup.number().typeError('Giá sản phẩm phải là số'),
          priceDiscount: Yup.number().typeError(
            'Giá giảm giá sản phẩm phải là số'
          ),
          images: Yup.array().required('Hình ảnh là bắt buộc'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const cloneValues = deepClone(values);
          const publishedDate = new Date(cloneValues.publishedDate);

          cloneValues.totalPages = parseInt(cloneValues.totalPages);
          cloneValues.priceDiscount = parseInt(cloneValues.priceDiscount);
          cloneValues.price = parseInt(cloneValues.price);
          cloneValues.publishedDate = publishedDate.toISOString();

          try {
            const req = createFormDataRequest({
              ...cloneValues,
            });

            if (data === null) {
              await createBook(req);
            } else {
              await editBook(data?.id, req);
            }
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công`,
            });
            refetchAfterClose && refetchAfterClose();
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình ${
                data === null ? 'tạo' : 'cập nhật'
              } sản phẩm`,
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
            title={data === null ? 'Tạo sản phẩm' : 'Chỉnh sửa sản phẩm'}
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.name && errors.name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-name">
                  Tên sách
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
              <FormControl
                fullWidth
                error={Boolean(touched.description && errors.description)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-description">
                  Mô tả sách
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-description"
                  type="text"
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
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
                error={Boolean(
                  touched.availableQuantity && errors.availableQuantity
                )}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-availableQuantity">
                  Số lượng sách còn lại
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-availableQuantity"
                  type="text"
                  value={values.availableQuantity}
                  name="availableQuantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.availableQuantity && errors.availableQuantity && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-availableQuantity"
                  >
                    {errors.availableQuantity as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.isbn && errors.isbn)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-isbn">
                  Mã sách
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-isbn"
                  type="text"
                  value={values.isbn}
                  name="isbn"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.isbn && errors.isbn && (
                  <FormHelperText error id="standard-weight-helper-text-isbn">
                    {errors.isbn as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.totalPages && errors.totalPages)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-totalPages">
                  Tổng số trang
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-totalPages"
                  type="text"
                  value={values.totalPages}
                  name="totalPages"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Mô tả thể loại"
                  inputProps={{}}
                />
                {touched.totalPages && errors.totalPages && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-totalPages"
                  >
                    {errors.totalPages as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.price && errors.price)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-price">
                  Giá {'(vnd)'}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-price"
                  type="text"
                  value={values.price}
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Giá thể loại"
                  inputProps={{}}
                />
                {touched.price && errors.price && (
                  <FormHelperText error id="standard-weight-helper-text-price">
                    {errors.price as any}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.priceDiscount && errors.priceDiscount)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-priceDiscount">
                  Giá giảm giá {'(vnd)'}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-priceDiscount"
                  type="text"
                  value={values.priceDiscount}
                  name="priceDiscount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Giá giảm giá thể loại"
                  inputProps={{}}
                />
                {touched.priceDiscount && errors.priceDiscount && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-priceDiscount"
                  >
                    {errors.priceDiscount as any}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.images && errors.images)}
                sx={{ ...theme.typography.customInput }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    position: 'relative',
                    backgroundColor: '#fafafa',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    '&:hover': {
                      border: '1px solid #000',
                    },
                  }}
                >
                  <Typography sx={{ color: '#9e9e9e' }}>Hình ảnh</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: values.images ? 'column' : 'row',
                      justifyContent: 'space-between',
                      columnGap: '0.5rem',
                      rowGap: '0.5rem',
                    }}
                  >
                    <div className="pt-2">
                      {values?.images ? (
                        <ListImage listImage={values.images} />
                      ) : (
                        <div>Chưa có hình ảnh</div>
                      )}
                    </div>
                    <IconButton
                      sx={{
                        width: 'fit-content',
                        height: 'fit-content',
                        padding: 0,
                      }}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        multiple
                        id="outlined-adornment-book_image"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e) => onSelectImage(e, setValues)}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Box>
                </Box>
                {touched.images && errors.images && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-book_image"
                  >
                    {errors.images as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.publishedDate && errors.publishedDate)}
                sx={{ ...theme.typography.customInput }}
              >
                <Typography
                  sx={{
                    color: '#9e9e9e',
                    position: 'absolute',
                    top: '10px',
                    left: '16px',
                    zIndex: 10,
                  }}
                >
                  Ngày phát hành
                </Typography>
                <OutlinedInput
                  id="outlined-adornment-publishedDate"
                  type="date"
                  value={values.publishedDate}
                  name="publishedDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Ngày phát hành"
                  inputProps={{}}
                />
                {touched.publishedDate && errors.publishedDate && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-publishedDate"
                  >
                    {errors.publishedDate as any}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(touched.publisherId && errors.publisherId)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="select-publisherId">
                  Nhà xuất bản
                </InputLabel>

                <Select
                  id="select-publisherId"
                  value={values.publisherId}
                  label="Nhà xuất bản"
                  onChange={(event) => {
                    setValues((prev) => ({
                      ...prev,
                      publisherId: event.target.value,
                    }));
                  }}
                >
                  {/* render list publisher */}
                  {publishers?.map((publisher: any, _index: number) => (
                    <MenuItem key={_index} value={publisher?.id}>
                      {publisher?.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.publisherId && errors.publisherId && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-publisherId"
                  >
                    {errors.publisherId as any}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.genres && errors.genres)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="select-genres">Thể loại</InputLabel>

                <Select
                  multiple
                  id="select-genres"
                  value={values.genres}
                  label="Thể loại"
                  onChange={(event) => {
                    setValues((prev) => ({
                      ...prev,
                      genres: event.target.value,
                    }));
                  }}
                >
                  {/* render list genre */}
                  {genres?.map((genre: any, _index: number) => (
                    <MenuItem key={_index} value={genre?.id}>
                      {genre?.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.genres && errors.genres && (
                  <FormHelperText error id="standard-weight-helper-text-genres">
                    {errors.genres as any}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.authors && errors.authors)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="select-authors">Tác giả</InputLabel>

                <Select
                  multiple
                  id="select-authors"
                  value={values.authors}
                  label="Tác giả"
                  onChange={(event) => {
                    console.log(event.target.value);
                    setValues((prev) => ({
                      ...prev,
                      authors: event.target.value,
                    }));
                  }}
                >
                  {/* render list author */}
                  {authors?.map((author, _index) => (
                    <MenuItem key={_index} value={author?.id}>
                      {author?.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.authors && errors.authors && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-authors"
                  >
                    {errors.authors as any}
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
                  type="submit"
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
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

export default OrderModal;
